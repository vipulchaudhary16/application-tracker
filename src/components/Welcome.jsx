import React from 'react'
import { Link } from "react-router-dom";
//css written in App.css

function Welcome() {
    const quotes = [
        {
            quote: "Failing to prepare is preparing to fail.",
            author: "John Wooden"
        },
        {
            quote: "You can't manage what you don't measure.",
            author: "Peter Drucker"
        },
        {
            quote: "What gets measured gets managed.",
            author: "Peter Drucker"
        },
        {
            quote: "By failing to prepare, you are preparing to fail.",
            author: "Benjamin Franklin"
        },
        {
            quote: "Keep track of the jobs you apply for. You'll thank yourself later.",
            author: "Unknown"
        }
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div className="home-container">
            <h1>Job Application Tracker</h1>
            <p className="quote">{`"${randomQuote.quote}"`}</p>
            <p className="author">{`- ${randomQuote.author}`}</p>
            <div className="button-container">
                <Link to="/login">
                    <button className="btn btn-primary">LOGIN</button>
                </Link>
                <Link to="/signup">
                    <button className="btn btn-secondary">SIGNUP</button>
                </Link>
            </div>
        </div>
    )
}

export default Welcome