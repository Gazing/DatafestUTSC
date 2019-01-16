import React, { Component } from 'react';
import Actions from "./Actions";
import { Timeline, Bookmark } from 'react-vertical-timeline';
import FrontPage from "./FrontPage";
let Spinner = require('react-spinkit');
let marked = require("marked");


/**
 * Renders the Past Events page
 * Sections can be added / changed here
 */
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
			
			this.setState({data: result, loading: false});
		}.bind(this));
	}
	
	render() {
		return <div>
			<FrontPage.NavBarBasic animationDisabled={true} opaque={true} useAnchor={true}/>
			<div className="container event-wrapper">
				{
					this.state.loading ? <LoadingAnimation/> : 
										<div className="post-wrapper">
											
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

/**
 * Loading animation for getting the page data
 */
class LoadingAnimation extends Component {
	render() {
		return <div className="loader-wrapper">
				<div className="loading-animation-1">
					<Spinner name="cube-grid" color="#546A7B"/>
				</div>
			</div>;
	}
}

class Introduction extends Component {
	render() {
		return <section id="introduction">
				<header>{this.props.data.header}</header>
				<div className="body" dangerouslySetInnerHTML={{__html: marked(this.props.data.body)}}>
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
