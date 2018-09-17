import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import Actions from "./Actions";
import { Timeline, Bookmark } from 'react-vertical-timeline';

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
				<li className="dropdown"><a className="dropdown-toggle" id="navbarDropdown" href="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Past Events</a>
					<div className="dropdown-menu" aria-labelledby="navbarDropdown"><a className="dropdown-item">tetestt</a>
					</div>
				</li>
			</ul>
		</div>;
	}
}

class TimelineNav extends Component {
	
	constructor() {
		super();
		this.state = {
			progress: 0,
			height: window.innerHeight
		}
	}
	
	componentDidMount() {
		setInterval(this.checkHeight.bind(this), 100);
	}
	
	checkHeight() {
		if (window.innerHeight != this.state.height)
			this.setState({height: window.innerHeight});
	}
	
	render() {
		return <Timeline height={this.state.height} progress={ this.state.progress } onSelect={p => this.setState({ progress: p })}>
			<Bookmark progress={20} onSelect={p => {this.setState({ progress: p}); window.location = "#"+"introduction"}}>
				Introduction
			</Bookmark>
			<Bookmark progress={35} onSelect={p => {this.setState({ progress: p}); window.location = "#"+"awards"}}>
				Awards
			</Bookmark>
			<Bookmark progress={40} onSelect={p => {this.setState({ progress: p}); window.location = "#"+"prize1"}}>
				Best in Show
			</Bookmark>
			<Bookmark progress={45} onSelect={p => {this.setState({ progress: p}); window.location = "#"+"prize2"}}>
				Best Visualization
			</Bookmark>
			<Bookmark progress={50} onSelect={p => {this.setState({ progress: p}); window.location = "#"+"prize3"}}>
				Best Use of External Data
			</Bookmark>
			<Bookmark progress={75} onSelect={p => {this.setState({ progress: p}); window.location = "#"+"gallery"}}>
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
					<img className="picture" src="/images/datafest-ph.jpg" />
					
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
