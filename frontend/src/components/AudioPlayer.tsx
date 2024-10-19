import React, { useRef, useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { BASE_URL } from '@/api/api';
import { CirclePlay, CirclePause } from 'lucide-react';

type Audio = string;


const AudioPlayer = ({lessonId}: {lessonId: string}) => {

    const navigate = useNavigate();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [audioData, setAudioData] = useState<Audio | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const STORAGE_KEY = `audio-${lessonId}-current-time`;
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchAudio = async () => {
            setLoading(true);
            const url = `${BASE_URL}/lessons/${lessonId}/audio`;
            try {
                const response = await fetch(url);
                const audioBlob = await response.blob();
                const data = URL.createObjectURL(audioBlob)
                setAudioData(data);
            } catch (error) {
                console.error('Error fetching audio data:', error);
                navigate('/not-found');
            }
            setLoading(false);
        };

        fetchAudio();
    }, [lessonId, navigate]);

    useEffect(() => {
        const audioElement = audioRef.current;

        if (!audioElement){
            return
        }

        if (audioData) {
            const savedTime = localStorage.getItem(STORAGE_KEY);
            if (savedTime) {
                audioElement.currentTime = parseFloat(savedTime);
            }
        }

        const handleTimeUpdate = () => {
            setCurrentTime(audioElement.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audioElement.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            localStorage.removeItem(STORAGE_KEY);
        };

        if (audioElement) {
            audioElement.addEventListener('timeupdate', handleTimeUpdate);
            audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
            audioElement.addEventListener('ended', handleEnded);
        }

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('timeupdate', handleTimeUpdate);
                audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audioElement.removeEventListener('ended', handleEnded);
            }
        };
    }, [audioData, STORAGE_KEY]);

    useEffect(() => {
        const audioElement = audioRef.current;

        const saveCurrentTime = () => {
            if (audioElement) {
                localStorage.setItem(STORAGE_KEY, audioElement.currentTime.toString());
            }
        };

        if (audioElement) {
            audioElement.addEventListener('pause', saveCurrentTime);
            audioElement.addEventListener('seeked', saveCurrentTime);
        }

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('pause', saveCurrentTime);
                audioElement.removeEventListener('seeked', saveCurrentTime);
            }
        };
    }, [STORAGE_KEY]);

    const togglePlayPause = () => {
        const audioElement = audioRef.current;
        if (!audioData || !audioElement) return;

        if (!isPlaying) {
            audioElement.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            setIsPlaying(true);
        } else {
            audioElement.pause();
            setIsPlaying(false);
        }
    };

    // Format time in mm:ss
    const formatTime = (time: number): string => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Handle progress bar click to seek
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (clickX / width) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    // Keyboard shortcut for play/pause (Spacebar)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                togglePlayPause();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPlaying, togglePlayPause]);

    if (!audioData) {
        return <p>Loading audio...</p>;
    }

    return (
        <>
            {loading && <p>Loading</p>}
            {!loading && audioData && <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md flex items-end justify-between gap-4'>
                {!isPlaying ? <CirclePlay className='w-8 h-8 object-cover' onClick={togglePlayPause}/> : <CirclePause className='w-8 h-8 object-cover' onClick={togglePlayPause}/>}
                <div className="flex-1">
                {/* <h2 className="text-2xl font-semibold mb-2">{audioData.title}</h2>
                <p className="text-gray-600 mb-4">
                    Uploaded at: {new Date(audioData.uploaded_at).toLocaleString()}
                </p> */}
                <div>
                    <div className=" text-gray-700">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                    <div
                        className="w-full h-2 bg-gray-300 rounded mt-2 cursor-pointer relative"
                        onClick={handleProgressClick}
                    >
                        <div
                        className="h-full bg-blue-500 rounded"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                        ></div>
                    </div>
                    <audio ref={audioRef} src={audioData} />
                </div>
                
                </div>
            </div>}
        </>
      );
}

export default AudioPlayer