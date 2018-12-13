import React, {Component} from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import './App.css';

function SetScore(homeScore, awayScore) {
    this.homeScore = homeScore;
    this.awayScore = awayScore;
}

const servers = {
    HOME: "home",
    AWAY: "away"
};

class MatchScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: [],
            // currentScorer: servers.HOME
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => this.loadStatus(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    loadStatus() {
        fetch("http://localhost:8888/score")
            .then(result => result.json())
            .then(result => this.setState(result));
    }

    render() {
        const scores = [new SetScore(11, 9), new SetScore(5, 11)]; //Array.from(this.state);
        const currentSetScore = new SetScore(1, 10); //scores.pop();
        const previousScores = scores.map(function (setScore) {
            return setScore.homeScore + ":" + setScore.awayScore;
        }).join("|");

        return (
            <div className="App">
                <div className="MatchScore">
                    <Grid>
                        <Row className="show-grid">
                            <span className="previousScores">{previousScores}</span>
                        </Row>
                        <Row className="show-grid score">
                            <Col lg={8}>
                                <span>{currentSetScore.homeScore}</span>
                            </Col>
                            <Col lg={2}>
                                <span>:</span>
                            </Col>
                            <Col lg={8}>
                                <span>{currentSetScore.awayScore}</span>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default MatchScore;