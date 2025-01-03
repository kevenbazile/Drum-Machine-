(function() {
    "use strict";

    const heaterKit = [
        { keyCode: 81, keyTrigger: "Q", id: "Heater-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
        { keyCode: 87, keyTrigger: "W", id: "Heater-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
        { keyCode: 69, keyTrigger: "E", id: "Heater-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
        { keyCode: 65, keyTrigger: "A", id: "Heater-4", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
        { keyCode: 83, keyTrigger: "S", id: "Clap", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
        { keyCode: 68, keyTrigger: "D", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
        { keyCode: 90, keyTrigger: "Z", id: "Kick-n'-Hat", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
        { keyCode: 88, keyTrigger: "X", id: "Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
        { keyCode: 67, keyTrigger: "C", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
    ];

    const smoothPianoKit = [
        { keyCode: 81, keyTrigger: "Q", id: "Chord-1", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },
        { keyCode: 87, keyTrigger: "W", id: "Chord-2", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },
        { keyCode: 69, keyTrigger: "E", id: "Chord-3", url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },
        { keyCode: 65, keyTrigger: "A", id: "Shaker", url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },
        { keyCode: 83, keyTrigger: "S", id: "Open-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },
        { keyCode: 68, keyTrigger: "D", id: "Closed-HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" },
        { keyCode: 90, keyTrigger: "Z", id: "Punchy-Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },
        { keyCode: 88, keyTrigger: "X", id: "Side-Stick", url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" },
        { keyCode: 67, keyTrigger: "C", id: "Snare", url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" }
    ];

    const defaultPadStyle = {
        backgroundColor: "grey",
        marginTop: 10,
        boxShadow: "3px 3px 5px black"
    };

    const activePadStyle = {
        backgroundColor: "orange",
        boxShadow: "0 3px orange",
        height: 77,
        marginTop: 13
    };

    class DrumPad extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                padStyle: defaultPadStyle
            };
            this.playSound = this.playSound.bind(this);
            this.handleKeyPress = this.handleKeyPress.bind(this);
            this.activatePad = this.activatePad.bind(this);
        }

        componentDidMount() {
            document.addEventListener("keydown", this.handleKeyPress);
        }

        componentWillUnmount() {
            document.removeEventListener("keydown", this.handleKeyPress);
        }

        handleKeyPress(event) {
            if (event.keyCode === this.props.keyCode) {
                this.playSound();
            }
        }

        activatePad() {
            if (this.props.power) {
                if (this.state.padStyle.backgroundColor === "orange") {
                    this.setState({ padStyle: defaultPadStyle });
                } else {
                    this.setState({ padStyle: activePadStyle });
                }
            } else {
                if (this.state.padStyle.marginTop === 13) {
                    this.setState({ padStyle: defaultPadStyle });
                } else {
                    this.setState({ padStyle: { height: 77, marginTop: 13, backgroundColor: "grey", boxShadow: "0 3px grey" } });
                }
            }
        }

        playSound() {
            const audio = document.getElementById(this.props.keyTrigger);
            audio.currentTime = 0;
            audio.play();
            this.activatePad();
            setTimeout(() => this.activatePad(), 100);
            this.props.updateDisplay(this.props.clipId.replace(/-/g, " "));
        }

        render() {
            return React.createElement(
                "div",
                { className: "drum-pad", id: this.props.clipId, onClick: this.playSound, style: this.state.padStyle },
                React.createElement("audio", { className: "clip", id: this.props.keyTrigger, src: this.props.clip }),
                this.props.keyTrigger
            );
        }
    }

    class PadBank extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            let padBank;
            if (this.props.power) {
                padBank = this.props.currentPadBank.map((pad, index, bank) =>
                    React.createElement(DrumPad, {
                        clip: bank[index].url,
                        clipId: bank[index].id,
                        key: bank[index].id,
                        keyCode: bank[index].keyCode,
                        keyTrigger: bank[index].keyTrigger,
                        power: this.props.power,
                        updateDisplay: this.props.updateDisplay
                    })
                );
            } else {
                padBank = this.props.currentPadBank.map((pad, index, bank) =>
                    React.createElement(DrumPad, {
                        clip: "#",
                        clipId: bank[index].id,
                        key: bank[index].id,
                        keyCode: bank[index].keyCode,
                        keyTrigger: bank[index].keyTrigger,
                        power: this.props.power,
                        updateDisplay: this.props.updateDisplay
                    })
                );
            }
            return React.createElement("div", { className: "pad-bank" }, padBank);
        }
    }

    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                power: true,
                display: String.fromCharCode(160),
                currentPadBank: heaterKit,
                currentPadBankId: "Heater Kit",
                sliderVal: 0.3
            };
            this.displayClipName = this.displayClipName.bind(this);
            this.selectBank = this.selectBank.bind(this);
            this.adjustVolume = this.adjustVolume.bind(this);
            this.powerControl = this.powerControl.bind(this);
            this.clearDisplay = this.clearDisplay.bind(this);
        }

        powerControl() {
            this.setState({
                power: !this.state.power,
                display: String.fromCharCode(160)
            });
        }

        selectBank() {
            if (this.state.power) {
                if (this.state.currentPadBankId === "Heater Kit") {
                    this.setState({ currentPadBank: smoothPianoKit, display: "Smooth Piano Kit", currentPadBankId: "Smooth Piano Kit" });
                } else {
                    this.setState({ currentPadBank: heaterKit, display: "Heater Kit", currentPadBankId: "Heater Kit" });
                }
            }
        }

        displayClipName(clipName) {
            if (this.state.power) {
                this.setState({ display: clipName });
            }
        }

        adjustVolume(event) {
            if (this.state.power) {
                this.setState({
                    sliderVal: event.target.value,
                    display: "Volume: " + Math.round(100 * event.target.value)
                });
                setTimeout(() => this.clearDisplay(), 1000);
            }
        }

        clearDisplay() {
            this.setState({ display: String.fromCharCode(160) });
        }

        render() {
            const powerStyle = this.state.power ? { float: "right" } : { float: "left" };
            const bankStyle = this.state.currentPadBank === heaterKit ? { float: "left" } : { float: "right" };

            document.querySelectorAll(".clip").forEach((audioElement) => {
                audioElement.volume = this.state.sliderVal;
            });

            return React.createElement(
                "div",
                { id: "drum-machine" },
                React.createElement(
                    "div",
                    { id: "display" },
                    React.createElement("h1", null, this.state.display)
                ),
                React.createElement(
                    "div",
                    { id: "drum-pads" },
                    React.createElement(PadBank, {
                        currentPadBank: this.state.currentPadBank,
                        power: this.state.power,
                        updateDisplay: this.displayClipName
                    })
                ),
                React.createElement(
                    "div",
                    { id: "controls" },
                    React.createElement("button", { className: "control-btn", id: "power", onClick: this.powerControl }, "Power"),
                    React.createElement("button", { className: "control-btn", id: "bank", onClick: this.selectBank, style: bankStyle }, "Bank"),
                    React.createElement("input", {
                        className: "control-btn",
                        id: "volume",
                        type: "range",
                        min: 0,
                        max: 1,
                        step: 0.01,
                        value: this.state.sliderVal,
                        onChange: this.adjustVolume
                    }),
                    React.createElement("label", { className: "control-btn", htmlFor: "volume" }, "Volume")
                )
            );
        }
    }

    ReactDOM.render(React.createElement(App), document.getElementById("root"));
})();
