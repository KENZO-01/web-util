import { useEffect, useState } from 'react'
import { Icon } from '@iconify-icon/react'

const Ai_voices = [
    { key: "UK Male", value: "Google UK English Male" },
    { key: "UK Female", value: "Google UK English Female" },
    { key: "US Male", value: "Google US English Male" },
    { key: "US Female", value: "Google US English Female" },
    { key: "Australian Male", value: "Google Australian English Male" },
    { key: "Australian Female", value: "Google Australian English Female" },
    { key: "Canadian Male", value: "Google Canadian English Male" },
    { key: "Canadian Female", value: "Google Canadian English Female" },
    { key: "Indian Male", value: "Google Indian English Male" },
    { key: "Indian Female", value: "Google Indian English Female" },
    { key: "Japanese Male", value: "Google Japanese Male" },
    { key: "Japanese Female", value: "Google Japanese Female" },
    { key: "Korean Male", value: "Google Korean Male" },
    { key: "Korean Female", value: "Google Korean Female" },
    { key: "Mandarin Chinese Male", value: "Google Mandarin Chinese Male" },
    { key: "Mandarin Chinese Female", value: "Google Mandarin Chinese Female" },
    { key: "Spanish Male", value: "Google Spanish Male" },
    { key: "Spanish Female", value: "Google Spanish Female" },
    { key: "French Male", value: "Google French Male" },
    { key: "French Female", value: "Google French Female" },
    { key: "German Male", value: "Google German Male" },
    { key: "German Female", value: "Google German Female" },
    { key: "Italian Male", value: "Google Italian Male" },
    { key: "Italian Female", value: "Google Italian Female" },
    { key: "Portuguese Male", value: "Google Portuguese Male" },
    { key: "Portuguese Female", value: "Google Portuguese Female" },
];


const TextToSpeech = () => {
    const [a, b] = useState("Google UK English Male")
    const [text, setText] = useState("The living picture adaptation will feature returning characters like Moana (voiced in the animated version by Auli'i Cravalho) but now have new additions, such as John Tui as Chief Tui, Frankie Adams as Sina, and Rena Owen as Gramma Tala. Lin-Manuel Miranda has composed the music for this film, and it was directed by Thomas Kail, who directed 'Hamilton'. He has tweeted on his enthusiasm for adapting 'Moana' into live - action, emphasizing how vital it is to Pacific Island culture to make it happen with music and dance - the essence of Polynesian identity.The Rock is utterly enthusiastic about the role and says it would be a great honor to the heritage he came from.")
    const [pitch, setPitch] = useState(1)
    const [rate, setRate] = useState(1)
    const [volume, setVolume] = useState(1)
    const [speaking, setSpeaking] = useState(false);
    const [paused, setPaused] = useState(false);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    const x = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

    useEffect(() => {
        const synth = window.speechSynthesis;
        const voicesAvailable = synth.getVoices();
        setVoices(voicesAvailable);
        synth.addEventListener('voiceschanged', () => {
            setVoices(synth.getVoices());
        });
    }, []);

    const handleSpeak = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();
        utterance.voice = selectedVoice;
        utterance.text = text;
        utterance.pitch = pitch;
        utterance.rate = rate;
        utterance.volume = volume;
        synth.cancel();
        synth.speak(utterance);
        setSpeaking(true);
        utterance.onend = () => {
            console.log('Utterance ended');
            handleCancel();
        };

        utterance.onerror = (event) => {
            console.log('Utterance error:', event);
            handleCancel();
        };

        utterance.onstart = () => {
            console.log('Utterance started');
        };
    };

    const handlePause = () => {
        const synth = window.speechSynthesis;
        synth.pause();
        setPaused(true);
    };

    const handleResume = () => {
        const synth = window.speechSynthesis;
        synth.resume();
        setPaused(false);
    };

    const handleCancel = () => {
        const synth = window.speechSynthesis;
        synth.cancel();
        setSpeaking(false);
    };


    return (
        <div>
            <select name="voices" id="ai-voices" value={a} onChange={(e) => b(e.target.value)}>
                {
                    Ai_voices.map((voice, idx) => {
                        return (
                            <option key={idx} value={voice.value}>{voice.key}</option>
                        )
                    })
                }
            </select>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />

            <p>Pitch</p>
            <select name="pitch" id="ai-pitch" value={pitch} onChange={(e) => setPitch(e.target.value)}>
                {
                    x.map((num, idx) => {
                        return (
                            <option key={idx} value={num}>{num}</option>
                        )
                    })
                }
            </select>

            <p>Rate</p>
            <select name="rate" id="ai-rate" value={rate} onChange={(e) => setRate(e.target.value)}>
                {
                    x.map((num, idx) => {
                        return (
                            <option key={idx} value={num}>{num}</option>
                        )
                    })
                }
            </select>

            <p>Volume</p>
            <select name="volume" id="ai-volume" value={volume} onChange={(e) => setVolume(e.target.value)}>
                {
                    x.map((num, idx) => {
                        return (
                            <option key={idx} value={num}>{num}</option>
                        )
                    })
                }
            </select>
            {
                speaking && !paused &&
                <button onClick={handlePause}>
                        <Icon icon="solar:pause-bold" width="64" height="64" style={{ color: '#000' }} />
                </button>
}
{
                !speaking &&
            <button onClick={handleSpeak}>
                        <Icon icon="mingcute:play-fill" width="64" height="64" style={{ color: '#000' }} />
            </button>
            }

            {
                paused &&
            <button onClick={handleResume}>
                <Icon icon="material-symbols:resume-rounded" width="64" height="64" style={{ color: '#000' }} />
            </button>
            }
            <button onClick={handleCancel}>
                <Icon icon="solar:stop-bold" width="64" height="64" style={{ color: '#000' }} />
            </button>
        </div >
    )
}

export default TextToSpeech