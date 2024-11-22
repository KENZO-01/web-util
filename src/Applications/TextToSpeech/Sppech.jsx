import PropTypes from 'prop-types';
import update from 'immutability-helper';


function SpeechSynthesis(props) {
    function getVoices() {
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(voice => voice.name === 'Google Australian English Female');
        return voice !== undefined ? voice : voices[0];
    }

    function speak() {
        window.speechSynthesis.cancel();
        const utterance = new window.SpeechSynthesisUtterance();
        utterance.voice = getVoices();
        utterance.text = props.text.replace(/\n/g, '');
        utterance.lang = props.lang || 'en-GB';
        utterance.pitch = parseFloat(props.pitch, 10) || 0.8;
        utterance.rate = parseFloat(props.rate, 10) || 1;
        utterance.volume = parseFloat(props.volume, 10) || 1;
        window.speechSynthesis.speak(utterance);
    }

    function pause() {
        window.speechSynthesis.pause();
    }

    function cancel() {
        window.speechSynthesis.cancel();
    }

    function resume() {
        window.speechSynthesis.resume();
    }

    function onend(func) {
        window.speechSynthesis.onend = func;
    }

    function onerror(func) {
        window.speechSynthesis.onerror = func;
    }

    return {
        speak,
        pause,
        cancel,
        resume,
        onend,
        onerror,
        getVoice: getVoices,
    };
}

function Speech(props) {
    function getVoices() {
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(voice => voice.name === props.voice);
        return voice !== undefined ? voice : voices[0];
    }

    function setbuttonState(play, stop, pause, resume) {
        var newState = update({
            play: { button: { pointerEvents: { $set: play } } },
            stop: { button: { pointerEvents: { $set: stop } } },
            pause: { button: { pointerEvents: { $set: pause } } },
            resume: { button: { pointerEvents: { $set: resume } } }
        });

        return newState;
    }

    function setSpeechSynthesis() {
        const speechSynthesis = new SpeechSynthesis(props);
        speechSynthesis.onend(onend);
        speechSynthesis.onerror(onerror);
        return speechSynthesis;
    }

    function play() {
        const speechSynthesis = setSpeechSynthesis();
        speechSynthesis.speak();
        setbuttonState('none', 'all', 'all', 'none');
    }

    function pause() {
        const speechSynthesis = setSpeechSynthesis();
        speechSynthesis.pause();
        setbuttonState('none', 'all', 'none', 'all');
    }

    function resume() {
        const speechSynthesis = setSpeechSynthesis();
        speechSynthesis.resume();
        setbuttonState('none', 'all', 'all', 'none');
    }

    function stop() {
        const speechSynthesis = setSpeechSynthesis();
        speechSynthesis.cancel();
        setbuttonState('all', 'none', 'none', 'none');
    }

    function onend() {
        stop();
    }

    function onerror() {
        stop();
    }

    function render() {
        if (props.disabled || !SpeechSynthesis.supported()) {
            return (
                <span className="rs-container" style={{}}>
                    <span className="rs-text" style={{}}>
                        {props.text}
                    </span>
                </span>
            );
        }

        let play;
        let stop;
        let pause;
        let resume;

        if (props.textAsbutton) {
            play = (
                <button
                    className="rs-play"
                    styles={{}}
                    onClick={play}
                >
                    <span className="rs-text" style={{}}>
                        {props.displayText || props.text}
                    </span>
                </button>
            );
        } else {
            play = (
                <button
                    className="rs-play"
                    styles={{}}
                    onClick={play}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                    >
                        <path d="M8 5v14l11-7z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                </button>
            );
        }

        if (props.stop) {
            stop = (
                <button
                    className="rs-stop"
                    styles={{}}
                    onClick={stop}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                    >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 6h12v12H6z" />
                    </svg>
                </button>
            );
        }

        if (props.pause) {
            pause = (
                <button
                    className="rs-pause"
                    onClick={pause}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                    >
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                </button>
            );
        }

        if (props.resume) {
            resume = (
                <button
                    className="rs-resume"
                    styles={{}}
                    onClick={resume}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                    >
                        <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                </button>
            );
        }

        return (
            <span className="rs-container" style={{}}>
                {play} {stop} {pause} {resume}
            </span>
        );
    }

    return render();
}

Speech.propTypes = {
    styles: PropTypes.object,
    text: PropTypes.string.isRequired,
    pitch: PropTypes.string,
    rate: PropTypes.string,
    volume: PropTypes.string,
    lang: PropTypes.string,
    voiceURI: PropTypes.string,
    voice: PropTypes.string,
    textAsbutton: PropTypes.bool,
    displayText: PropTypes.string,
    disabled: PropTypes.bool,
    stop: PropTypes.bool,
    pause: PropTypes.bool,
    resume: PropTypes.bool
};

export default Speech;

