import React, { useEffect, useState } from 'react';
import GameApiClient from '../services/GameApiClient';
import 'bootstrap/dist/css/bootstrap.min.css';

function StatsComponent(props) {
    const [userId, setUserID] = useState('');
    const [score, setScore] = useState('');
    const [badges, setBadges] = useState([]);

    let refreshStats = (id) => {
        GameApiClient.getStats(id).then(
            res => {
                if(res.ok) {
                    res.json().then(json =>{
                        setUserID(json.userId);
                        setScore(json.score);
                        setBadges(json.badges);
                    })
                    console.log("badges: " + badges);
                } else {
                    console.log('Error mapping user id');
                    setScore('serverError');
                }
                
            }
        );
    }

    useEffect(() => {
        refreshStats(props.id);
    }, [props.flag]);

    if (score == 'serverError') {
        return (
            <div>We're sorry, but we can't display game statistics at this moment.</div>
        );
    }
    return (
        <div>
            <h3>통계</h3>
            <table className="table">
            <tbody>
                <tr>
                    <td className="info">사용자 ID:</td>
                    <td>{userId}</td>
                </tr>
                <tr>
                    <td className="info">점수:</td>
                    <td>{score}</td>
                </tr>
                <tr>
                    <td >배지:</td>
                    <td>{badges.map(b => <span className="game-badge" key={b}>{b}</span>)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default StatsComponent;