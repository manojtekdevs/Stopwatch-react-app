import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {isTimerRunning: false, minutes: 0, seconds: 0}

  componentDidMount() {
    this.secondsTimerId = setInterval(this.increseSeconds, 1000)
  }

  componentWillUnmount() {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      clearInterval(this.secondsTimerId)
    }
  }

  onClickStartButton = () => {
    this.setState({isTimerRunning: true})
  }

  onClickStopButton = () => {
    this.setState({isTimerRunning: false})
  }

  onClickResetButton = () => {
    this.setState({isTimerRunning: false, minutes: 0, seconds: 0})
  }

  increseSeconds = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning) {
      this.setState(prevState => {
        if (prevState.seconds >= 59) {
          return {seconds: 0, minutes: prevState.minutes + 1}
        }
        return {seconds: prevState.seconds + 1}
      })
    }
  }

  render() {
    const {minutes, seconds} = this.state
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return (
      <div className="app-bg-container">
        <div className="stopwatch-container">
          <h1 className="main-heading">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer-logo-card">
              <img
                className="timer-icon"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <p className="timer">Timer</p>
            </div>
            <h1 className="timer-in-min-sec">
              {stringifiedMinutes}:{stringifiedSeconds}
            </h1>
            <div className="timer-control-btns-container">
              <button
                className="timer-control-btn start-btn"
                type="button"
                onClick={this.onClickStartButton}
                data-testid="start"
              >
                start
              </button>
              <button
                className="timer-control-btn stop-btn"
                type="button"
                onClick={this.onClickStopButton}
                data-testid="stop"
              >
                Stop
              </button>
              <button
                className="timer-control-btn reset-btn"
                type="button"
                onClick={this.onClickResetButton}
                data-testid="reset"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
