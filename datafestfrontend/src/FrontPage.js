import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';
import Registration from "./Registration";
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
let marked = require("marked");

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
		return <div className="section-wrapper">
				<SplashSection>
					<SplashText/>
				</SplashSection>
				<div className="container-wrapper">
					<div className="container">
						<AboutSection />
						<ScheduleSection />
						<SponsorsSection />
						<WorkshopSection />
						<FAQSection />
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
		if (this.props.animationDisabled) return;
		this.setState({opaque: (window.scrollY > 0)});
	}

	render() {
		return <ScrollWrapper onWindowScroll={this.onWindowScroll.bind(this)}>
			<div className={"banner container-fluid"+(this.state.opaque ? " banner-colored" : "")}>
					<a href="/" className="logo">
						DataFest @ UTSC
					</a>
					<MobileNavMenu useAnchor={this.props.useAnchor} />
					<ul className="nav navbar-right d-none d-lg-flex">
						<AnimatedShortcut link="/#about" name="About" useAnchor={this.props.useAnchor} animationDisabled={this.props.animationDisabled} />

						<AnimatedShortcut link="/#schedule" name="Schedule" useAnchor={this.props.useAnchor} animationDisabled={this.props.animationDisabled} />
						
						<AnimatedShortcut link="/#sponsors" name="Sponsors" useAnchor={this.props.useAnchor} animationDisabled={this.props.animationDisabled} />

						<AnimatedShortcut link="/#workshops" name="Workshops" useAnchor={this.props.useAnchor} animationDisabled={this.props.animationDisabled} />
						
						<AnimatedShortcut link="/#FAQ" name="FAQ" useAnchor={this.props.useAnchor} animationDisabled={this.props.animationDisabled} />
		
						<PastEventsDropDown />
					</ul>
			
			</div>
		</ScrollWrapper>
	}
}

class MobileNavMenu extends Component {
	constructor() {
		super();
		this.state = {
			hideMenu: true,
			menuActive: null,
		};
		this.menuStack = [];
	}
	
	onClick() {
		this.setState({hideMenu: !this.state.hideMenu});
	}
	
	onChangeMenu(menu) {
		this.menuStack.push(this.state.menuActive);
		this.setState({menuActive: menu});
	}
	
	onBack() {
		this.setState({menuActive: this.menuStack.pop()});
	}
	
	itemOnClick() {
		this.setState({hideMenu: true});
	}
	
	componentDidMount() {
		this.setState({menuActive: <MobileMenuMain useAnchor={this.props.useAnchor} onBack={this.onBack.bind(this)} onChangeMenu={this.onChangeMenu.bind(this)} itemOnClick={this.itemOnClick.bind(this)} />}) ;
	}
	
	render() {
		return <div>
			<nav className={"mobile-nav d-lg-none "+(this.state.hideMenu ? "" : "menu-active")}>
				{this.state.menuActive}
			</nav>
			<div className="mobile-menu d-lg-none" onClick={() => { this.onClick() }}>
			</div>
			
		</div>;
	}
}

class MobileMenuMain extends Component {

	constructor() {
		super();
	}
	
	render() {
		return <ul className="menu-list">
			<header>Menu</header>
			<AnimatedShortcut link="/#about" name="About" useAnchor={this.props.useAnchor} animationDisabled={this.props.animationDisabled} onClick={this.props.itemOnClick}/>

			<AnimatedShortcut link="/#schedule" name="Schedule" useAnchor={this.props.useAnchor} animationDisabled={this.props.animationDisabled} onClick={this.props.itemOnClick}/>

			<AnimatedShortcut link="/#sponsors" name="Sponsors" useAnchor={this.props.useAnchor} animationDisabled={this.props.animationDisabled} onClick={this.props.itemOnClick}/>

			<AnimatedShortcut link="/#workshops" name="Workshops" useAnchor={this.props.useAnchor} animationDisabled={this.props.animationDisabled} onClick={this.props.itemOnClick}/>

			<AnimatedShortcut link="/#FAQ" name="FAQ" useAnchor={this.props.useAnchor} animationDisabled={this.props.animationDisabled} onClick={this.props.itemOnClick}/>
			
			<MobileMenuTab text="Past Events" menu={MobileMenuPastEvents} onBack={this.props.onBack} onChangeMenu={this.props.onChangeMenu}/>
		</ul>;
	}
}



class MobileMenuTab extends Component {
	
	constructor() {
		super();
		this.state = {
			active: false
		}
	}
	
	render() {
		return <li onClick={() => {this.props.onChangeMenu(<this.props.menu onBack={this.props.onBack}/>)}}>
			{this.props.text}
		</li>;
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

class MobileMenuPastEvents extends PastEventsDropDown {

	constructor() {
		super();
	}

	render() {
		return <ul className="menu-list">
			
			<header>Past Events</header>
			<div className="back-button-mobile" onClick={this.props.onBack}>Back</div>
			{this.state.pastEvents.map(function (item) {
				return <li>
					<a href={"/past-events/"+item.title.replace(" ", "-")}>
						{item.title}
					</a>
				</li>
			})}
		</ul>;
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
		this.targetElement = null;
	}
	
	componentDidMount() {
		
		this.targetElement = $(this.props.link.substring(1, this.props.link.length))[0];
		this.onWindowScroll();
	}

	render() {
		return <li onClick={this.props.onClick}>
			<ScrollWrapper onWindowScroll={this.onWindowScroll.bind(this)}>
				{this.props.useAnchor ? <a href={this.props.link} className={this.state.active ? "nav-active" : ""}> {this.props.name} </a> :
					<Link smooth to={this.props.link} className={this.state.active ? "nav-active" : ""}> {this.props.name} </Link>}
			</ScrollWrapper>
		</li>
	}

	onWindowScroll(event) {
		if (this.props.animationDisabled || !this.targetElement) return;
		let rect = this.targetElement.getBoundingClientRect();
		if (rect.bottom > 120 && rect.top < 120)
			this.setState({active: true});
		else this.setState({active: false});
		
	}
}

AnimatedShortcut.propTypes = {
	activeStart: PropTypes.number,
	activeEnd: PropTypes.number,
	name: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
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
			introBody: "",
			introTitle: null
		}
	}

	componentDidMount() {
		this.setState(window.datafest.snippets);
	}

	render() {
		return <div className="subsection">
			<header>{this.state.introTitle}</header>
			<div className="body" dangerouslySetInnerHTML={{__html: marked(this.state.introBody)}}></div>
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

class SnippetBase extends Component {
	componentDidMount() {
		this.setState(window.datafest.snippets);
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
		return <Prize className={prize.className} label={prize.name} color={prize.color} amount={prize.amount}/>
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
					<div className="prize-block">
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
	constructor() {
		super();
		this.state = {
			schedule: [],
			locations: []
		};
	}
	
	componentWillMount() {
		var locations = [];
		window.datafest.schedule.forEach(function (item) {
			if (locations.indexOf(item.location) === -1) locations.push(item.location);
		});
		this.setState({schedule: window.datafest.schedule, locations: locations});
		
	}
	
	componentDidMount() {
		var timetable = new window.Timetable();
		timetable.setScope(9, 23);
		
		timetable.addLocations(this.state.locations);
		
		this.state.schedule.forEach(function (item) {
			let options = {
				class: item.colour
			};
			timetable.addEvent(item.name, item.location, new Date(item.start), new Date(item.end), options);
		});

		var renderer = new window.Timetable.Renderer(timetable);
		renderer.draw('.timetable');
	}
	
	render() {
		return <section id="schedule" className="section4">
			<header>Event Schedule</header>
			<div className="timetable"></div>
		</section>;
	}
}

class FAQSection extends SnippetBase {
	
	constructor() {
		super();
		this.state = {
			FAQBody: ""
		}
	}
	
	render() {
		return <section id="FAQ" className="section2">
			<header>FAQ</header>
			<div className="body" dangerouslySetInnerHTML={{__html: marked(this.state.FAQBody)}}></div>
		</section>;
	}
	
}

class WorkshopSection extends SnippetBase {
	
	constructor() {
		super();
		this.state = {
			workshopBody: ""
		}
	}
	
	render() {
		return <section id="workshops">
			<header>Workshops</header>
			<div className="body" dangerouslySetInnerHTML={{__html: marked(this.state.workshopBody)}}></div>
		</section>;
	}
	
}

let exp = {FrontPage: FrontPage, NavBarBasic: NavBarBasic, SplashSection: SplashSection, PastEventsDropDown: PastEventsDropDown};

export default exp;
