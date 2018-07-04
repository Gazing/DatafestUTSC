import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';
import Registration from "./Registration";
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';


class FrontPage extends Component {
	render() {
		return <div>
					<NavBarBasic />
					<Route exact path="/" component={MainPage} />
					<Route exact path="/registration" component={Registration} />
			</div>;
	}
}

class MainPage extends Component {
	render() {
		return <div>
				<SplashSection>
					<SplashText/>
				</SplashSection>
				<div className="container-wrapper">
					<div className="container">
						<AboutSection />
						<SponsorsSection />
					</div>
				</div>
			</div>;
	}
}

class NavBarBasic extends Component {

	constructor() {
		super();
		this.state = {
			opaque: false
		};
	}

	componentDidMount() {
		this.setState({opaque: (window.scrollY > 0) || this.props.opaque});
		
	}
	
	onWindowScroll() {
		this.setState({opaque: (window.scrollY > 0)});
	}

	render() {
		return <ScrollWrapper onWindowScroll={this.onWindowScroll.bind(this)}>
			<div className={"banner container-fluid"+(this.state.opaque ? " banner-colored" : "")}>
					<Link to="/" className="logo">
						DataFest @ UTSC
					</Link>
					<ul className="nav navbar-right">
						<AnimatedShortcut link="/#about" name="About" activeStart={0.41} activeEnd={0.85}/>
		
						<AnimatedShortcut link="/#sponsors" name="Sponsors" activeStart={0.85} activeEnd={1.03}/>
		
						<AnimatedShortcut link="/#schedule" name="Schedule" activeStart={1} activeEnd={1}/>
		
						<PastEventsDropDown />
					</ul>
			
			</div>
		</ScrollWrapper>
	}
}

class PastEventsDropDown extends Component {
	
	constructor() {
		super();
		this.state = {
			pastEvents: [],
		};
	}

	componentDidMount() {
		this.setState({pastEvents: window.datafest.pastEvents});

	}
	
	render() {
		return <li className="dropdown">
			<a id="navbarDropdown" className="dropdown-toggle" href='' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
				Past Events
			</a>
			<div className="dropdown-menu" aria-labelledby='navbarDropdown'>
				{this.state.pastEvents.map(function (item) {
					return <a className="dropdown-item" href={"/past-events/"+item.title.replace(" ", "-")}>
						{item.title}
					</a>
				})}
			</div>
		</li>;
	}
}

class ScrollWrapper extends Component {

	render () {
		return this.props.children;
	}

	componentDidMount() {
		window.addEventListener("scroll", this.props.onWindowScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.props.onWindowScroll);
	}
}

function scrollPercent() {
	let height = 0.666 * document.scrollingElement.scrollHeight;
	let scroll = window.scrollY;

	return scroll / height;
}

class AnimatedShortcut extends Component {
	constructor() {
		super();
		this.state = {
			active: false
		};
	}

	render() {
		return <li>
			<ScrollWrapper onWindowScroll={this.onWindowScroll.bind(this)}>
				<Link smooth to={this.props.link} className={this.state.active ? "nav-active" : ""}> {this.props.name} </Link>
			</ScrollWrapper>
		</li>
	}

	onWindowScroll(event) {
		let percent = scrollPercent();
		if (percent >= this.props.activeStart && percent < this.props.activeEnd)
			this.setState({active: true});
		else this.setState({active: false});
		
	}
}

AnimatedShortcut.propTypes = {
	activeStart: PropTypes.number.isRequired,
	activeEnd: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired
};


class SplashSection extends Component {




	render() {
		return <section className="section1">
				<div className="splash"></div>
				<SplashAnimation/>
				{this.props.children}
		</section>
	}
}

class SplashText extends Component {
	
	constructor() {
		super();

		this.state = {
			eventDates: null,
			notice: null
		}
	}

	componentDidMount() {
		this.setState(window.datafest.snippets);
	}

	render() {
		return <div className="splash-text">
					<div className="asa-logo"></div>
					<div className="datafest-date">
						{this.state.eventDates}
					</div>
					<Link className="btn apply-button" to="/registration">Register</Link>
			</div>
	}
}

class SplashAnimation extends Component {
	constructor() {
		super();
		
		this.state = {
			rotation: 0
		}
	}
	
	componentDidMount() {
		setInterval(function () {
			this.setState({rotation: this.state.rotation+0.02});
		}.bind(this), 30);
	}
	
	render() {
		return <div className="bg-wrapper">
			<div id="splash-bg" className="splash-bg" style={{transform: "rotate("+this.state.rotation+"deg)"}}></div>
		</div>
	}
}

class AboutSection extends Component {



	render() {
		return <section id="about" className="section2">
					<header>About</header>
					<DescriptionSection />
					<PrizeSection />
				</section>;
	}
}

class DescriptionSection extends Component {
	constructor() {
		super();
		this.state = {
			introBody: null,
			introTitle: null
		}
	}

	componentDidMount() {
		this.setState(window.datafest.snippets);
	}

	render() {
		return <div className="subsection">
			<header>{this.state.introTitle}</header>
			<div className="body">{this.state.introBody}</div>
		</div>;
	}
}

class SponsorsSection extends Component {
	constructor() {
		super();
		this.state = {
			sponsors: []
		}
	}

	componentDidMount() {
		this.setState({sponsors: window.datafest.sponsors});
	}

	render() {
		return <section id="sponsors" className="section3">
			<header>Sponsored By</header>

			<div className="sponsor-view">
				{this.state.sponsors.map(function (sponsor) {
					return <img src={sponsor["secure_url"]} alt=""/>
				})}
			</div>
		</section>
	}
}

class PrizeSection extends Component {
	constructor() {
		super();
		this.state = {
			prizes: [{name: "Best in Show", amount: 300, className: "best-in-show"}, {name: "Best Visualization", amount: 300, className: "best-visual"}, {name: "Best Use of External Data", amount: 300, className: "best-data"}]
		}
	}
	
	renderPrize(prize) {
		let width = 1000 / this.state.prizes.length;
		return <Prize className={prize.className} width={width} label={prize.name} color={prize.color} amount={prize.amount}/>
	}
	
	render() {
		
		return <div id="prizes" className="subsection prize-section">
					<header>Prizes</header>
					<div className="subheading">Prizes are split into 3 categories</div>
					<div className="prize-view">
						{this.state.prizes.map(this.renderPrize.bind(this))}
					</div>
		</div>;
	}
}

class Prize extends Component {
	render() {
		return <div className="prize-item">
					<div className="prize-block" style={{width: this.props.width}}>
						<div className={"prize-art "+this.props.className}>
							
						</div>
						<div className="prize-label">
							{this.props.label}
						</div>
						<div className="prize-amount">
							{"$"+this.props.amount}
						</div>
					</div>

			</div>
	}
}

class ScheduleSection extends Component {
	
}

let exp = {FrontPage: FrontPage, NavBarBasic: NavBarBasic, SplashSection: SplashSection};

export default exp;
