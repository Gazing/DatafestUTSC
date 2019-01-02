import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import Actions from "./Actions";
import { Timeline, Bookmark } from 'react-vertical-timeline';
import { HashLink as Link } from 'react-router-hash-link'
import FrontPage from "./FrontPage"

class PastEventsPage extends Component {
	
	constructor() {
		super();
		
		this.state = {
			data: null,
			loading: true
		}
	}
	
	componentDidMount() {
		Actions.getPastEvent(this.props.match.params.name, function (err, result) {
			console.log(result);
			this.setState({data: result, loading: false});
		}.bind(this));
	}
	
	render() {
		return <div>
			<NavBar />
			<div className="container event-wrapper">
				{
					this.state.loading ? <LoadingAnimation/> : 
										<div className="post-wrapper">
											<div className="timeline-wrapper">
												<TimelineNav />
											</div>
											<div className="post-container">
												<Introduction data={this.state.data.intro} />
												<Awards data={this.state.data.awards} />
												<Gallery galleryLink={this.state.data.gallery} />
												<Sponsors sponsors={this.state.data.sponsors} />
											</div>
										</div>
				}
			</div>
		</div>;
	}
}

class LoadingAnimation extends Component {
	render() {
		return <div>
			LOADING...
		</div>;
	}
}

class NavBar extends Component {
	render() {
		return <div className="banner banner-colored container-fluid" id="datafest-nav">
			<div className="logo">DataFest @ UTSC</div>
			<ul className="nav navbar-right">
				<li><a href="/#about">About</a></li>
				<li><a href="/#sponsors">Sponsors</a></li>
				<li><a href="/#schedule">Schedule</a></li>
				<FrontPage.PastEventsDropDown />
			</ul>
		</div>;
	}
}

class TimelineNav extends Component {
	
	constructor() {
		super();
		this.state = {
			progress: 0,
			height: window.innerHeight - 240
		}
	}
	
	componentDidMount() {
		setInterval(this.checkHeight.bind(this), 100);
		window.addEventListener("scroll", function (e) {
			if (this.state.isScrolling) return;
			let h = document.documentElement,
				b = document.body,
				st = 'scrollTop',
				sh = 'scrollHeight';
			let percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
			this.setState({progress: percent});
		}.bind(this));
	}
	
	checkHeight() {
		if (window.innerHeight != this.state.height)
			this.setState({height: window.innerHeight - 240});
	}
	
	calculatePercent(element, addFlag) {
		if (!element) return 0;
		let scrollPos = element.offsetTop + 71 * addFlag;
		let h = document.documentElement,
			b = document.body,
			sh = 'scrollHeight';
		let percent = scrollPos / ((h[sh] || b[sh]) - h.clientHeight) * 100;
		if (percent > 100) percent = 100;
		return percent;

	}
	
	render() {
		let awardElement = $("#awards")[0];
		return <Timeline height={this.state.height} progress={ this.state.progress } onSelect={p => {this.setState({ progress: p }); 		
					let h = document.documentElement,
						b = document.body,
						sh = 'scrollHeight';
						let scroll = (p / 100) * ((h[sh]||b[sh]) - h.clientHeight);
						this.setState({isScrolling: true});
						$('html, body').animate({
							scrollTop: scroll
						}, 1000, function() {
							this.setState({isScrolling: false});
						}.bind(this))}} >
			<Bookmark progress={this.calculatePercent($("#introduction")[0], 1)} onSelect={p => {
				document.querySelector('#introduction').scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});}}>
				Introduction
			</Bookmark>
			<Bookmark progress={this.calculatePercent(awardElement, 1)} onSelect={p => {
				document.querySelector('#awards').scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});}}>
				Awards
			</Bookmark>
			<Bookmark progress={this.calculatePercent($("#prize1")[0], 0) + this.calculatePercent(awardElement, 1)} onSelect={p => {
				document.querySelector('#prize1').scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});}}>
				Best in Show
			</Bookmark>
			<Bookmark progress={this.calculatePercent($("#prize2")[0], 0) + this.calculatePercent(awardElement, 1)} onSelect={p => {
				document.querySelector('#prize2').scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});}}>
				Best Visualization
			</Bookmark>
			<Bookmark progress={this.calculatePercent($("#prize3")[0], 0) + this.calculatePercent(awardElement, 1)} onSelect={p => {
				document.querySelector('#prize3').scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});}}>
				Best Use of External Data
			</Bookmark>
			<Bookmark progress={this.calculatePercent($("#gallery")[0], 1)} onSelect={p => {
				document.querySelector('#gallery').scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});}}>
				Gallery
			</Bookmark>
		</Timeline>;
	}
}

class Introduction extends Component {
	render() {
		return <section id="introduction">
				<header>{this.props.data.header}</header>
				<div className="body">
					{this.props.data.body}
				</div>
				
			</section>;
	}
}

class Awards extends Component {
	render() {
		return <section id="awards">
				<header>Awards</header>
				<AwardContainer id="prize1" data={this.props.data.prize1} awardName="Best in Show"/>
				<AwardContainer id="prize2" data={this.props.data.prize2} awardName="Best Visualization"/>
				<AwardContainer id="prize3" data={this.props.data.prize3} awardName="Best use of External Data"/>
			</section>;
	}
}

class AwardContainer extends Component {
	render() {
		return <div className="award-container" id={this.props.id}>
			<div className="award-wrapper">
				<div className="body">
					<img className="picture" src={this.props.data.image["secure_url"]} />
					
				</div>
				<header>
					{this.props.awardName}
					<div className="team-members">
						<div className="team-name">
							{this.props.data.teamName}
						</div>
						<div className="members">
							<header>
								Members
							</header>
							{this.props.data.team.map(function (item) {
								return <div>{item}</div>;
							})}
						</div>
					</div>
				</header>
				
			</div>
		</div>;
	}
}

class Gallery extends Component {
	render() {
		return <section id="gallery">
				<header>Gallery</header>
				<div className="body">
					<a href={this.props.galleryLink} className="overlay">
						Go to Gallery >
					</a>
				</div>
			</section>;
	}
}

class Sponsors extends Component {

	render() {
		return <section id="sponsors">
			<header>Sponsors</header>

			<div className="sponsor-view">
				{this.props.sponsors.map(function (sponsor) {
					return <img src={sponsor["secure_url"]} alt=""/>
				})}
			</div>
		</section>
	}


}


export default PastEventsPage;
