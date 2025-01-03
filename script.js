const padBank1 = [
    {
        clipId: 'Heater-1',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
        key: 'Q'
    },
    {
        clipId: 'Heater-2',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
        key: 'W'
    },
    {
        clipId: 'Heater-3',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
        key: 'E'
    },
    {
        clipId: 'Heater-4',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4.mp3',
        key: 'A'
    },
    {
        clipId: 'Clap',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Clap.mp3',
        key: 'S'
    },
    {
        clipId: 'Open-HH',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Open-HH.mp3',
        key: 'D'
    },
    {
        clipId: 'Kick-n-Hat',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Kick-n-Hat.mp3',
        key: 'Z'
    },
    {
        clipId: 'Kick',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Kick.mp3',
        key: 'X'
    },
    {
        clipId: 'Closed-HH',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Closed-HH.mp3',
        key: 'C'
    }
];

const padBank2 = [
    {
        clipId: 'Chord-1',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
        key: 'Q'
    },
    {
        clipId: 'Chord-2',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
        key: 'W'
    },
    {
        clipId: 'Chord-3',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
        key: 'E'
    },
    {
        clipId: 'Shaker',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
        key: 'A'
    },
    {
        clipId: 'Open-HH',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
        key: 'S'
    },
    {
        clipId: 'Punchy-Kick',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
        key: 'D'
    },
    {
        clipId: 'Brk-1',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_1.mp3',
        key: 'Z'
    },
    {
        clipId: 'Brk-2',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_2.mp3',
        key: 'X'
    },
    {
        clipId: 'Brk-3',
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_3.mp3',
        key: 'C'
    }
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'Press a Pad',
            currentPadBank: padBank1,
            power: true,
            sliderVal: 0.5
        };
        this.handlePowerToggle = this.handlePowerToggle.bind(this);
        this.handleBankToggle = this.handleBankToggle.bind(this);
        this.handlePadClick = this.handlePadClick.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
    }

    handlePadClick(clipId, clipUrl) {
        if (this.state.power) {
            const audio = new Audio(clipUrl);
            audio.volume = this.state.sliderVal;
            audio.play();
            this.setState({ display: clipId });
        }
    }

    handlePowerToggle() {
        this.setState(prevState => ({
            power: !prevState.power,
            display: prevState.power ? 'Power OFF' : 'Power ON'
        }));
    }

    handleBankToggle() {
        this.setState(prevState => ({
            currentPadBank: prevState.currentPadBank === padBank1 ? padBank2 : padBank1,
            display: 'Changed Bank'
        }));
    }

    handleSliderChange(event) {
        this.setState({ sliderVal: event.target.value });
    }

    render() {
        return (
            <div id="drum-machine">
                <div id="display">{this.state.display}</div>
                <div id="pads">
                    {this.state.currentPadBank.map(pad => (
                        <button
                            key={pad.key}
                            className="drum-pad"
                            id={pad.clipId}
                            onClick={() => this.handlePadClick(pad.clipId, pad.clip)}
                        >
                            {pad.key}
                        </button>
                    ))}
                </div>
                <div id="controls">
                    <button onClick={this.handlePowerToggle}>
                        {this.state.power ? 'Power OFF' : 'Power ON'}
                    </button>
                    <button onClick={this.handleBankToggle}>
                        Switch Bank
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={this.state.sliderVal}
                        onChange={this.handleSliderChange}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
