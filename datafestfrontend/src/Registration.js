import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-dropdown/style.css'
import FrontPage from "./FrontPage";
import Dropdown from 'react-dropdown'
import Actions from "./Actions";
import { HashLink as Link } from 'react-router-hash-link';

class Registration extends Component {
	render() {
		return <div>
				<FrontPage.SplashSection>
					<RegistrationWrapper />
				</FrontPage.SplashSection>
		</div>;
	}
}

class RegistrationWrapper extends Component {
	constructor() {
		super();
		this.state = {

			result: {
				error: null,
				success: null
			}
		}
	}

	onResult(err, result) {
		this.setState({result: {err: err, success: result}});
	}
	
	render() {
		return <div className="register-wrapper card">
			<div className="form-header">Register to be a part of ASA DataFest 2019</div>
				{this.state.result.error || !this.state.result.success ?
					<RegistrationForm error={this.state.result.error} onResult={this.onResult.bind(this)}/> :
					<SuccessView />}

			</div>
	}
	
}

class SuccessView extends Component {
	constructor() {
		super();
		this.state = {
			result: null,
			spin: false,
			check: false,
		}
	}
	
	componentDidMount() {
		setTimeout(function () {
			this.setState({spin: true});
			setTimeout(function () {
				this.setState({check: true});
			}.bind(this), 750);
		}.bind(this), 100);
	}
	
	render() {
		return <div className="success-wrapper">
				<div className={"spin circle"+(this.state.spin ? " active": "")}>
					<div className={"check-mark"+(this.state.check ? " active": "")}></div>
				</div>
				
				<div className={"message-wrapper"+(this.state.check ? " active": "")}>
					<div className="success-label">Application submitted!</div>
					<div className="success-description">Your team will be notified via email if you are selected to participate in DataFest@UTSC.
					</div>
					<div className="success-description">Thank You for applying</div>
					<Link to="/" className="back-button">Back to home</Link>
				</div>
			</div>;
	}
}

class RegistrationForm extends Component {
	
	constructor() {
		super();

		this.state = {
			active: false,
			isAnimating: true,
			maxTeamSize: 0,
			teamName: null,
			email: null,
			tms: {}

		};
		
	}
	
	componentDidMount() {
		let tms = {};
		let teamSize = parseInt(window.datafest.snippets.maxTeamSize);
		for (let i = 0; i < teamSize; i++) {
			let tm = {
				firstName: null,
				lastName: null,
				year: null,
				program: null,
				campus: null
			};
			let n = i+1;
			tms["tm"+n] = tm;
		}
		this.setState({maxTeamSize: teamSize, tms: tms});
		setTimeout(function () {
			this.setState({active: true});
			setTimeout(function () {
				this.setState({isAnimating: false});
			}.bind(this), 700);
		}.bind(this), 300);
	}
	
	inputOnChange(tm, binding) {
		return function (newValue) {
			let t = this.state.tms[tm];
			t[binding] = newValue;
			let temp = {};
			temp[tm] = t;
			this.setState(temp);
		}.bind(this);
	};
	
	onSubmit(e) {
		e.preventDefault();
		let teamList = [];
		for (let tm in this.state.tms) {
			let teamMember = this.state.tms[tm];
			if (!teamMember.firstName) continue;
			teamMember.name = {first: teamMember.firstName, last: teamMember.lastName};
			teamList.push(teamMember);
		}
		Actions.onSubmitRegistration({
			teamName: this.state.teamName,
			email: this.state.email,
			teamMembers: teamList
		}, this.props.onResult);
	}
	
	makeList() {
		let list = [];
		for (let i = 0; i < this.state.maxTeamSize; i++) {
			list.push((i+1));
		}
		return list;
	}
	
	isPartiallyFilled(name) {
		let t = this.state.tms[name];
		return t.firstName || t.lastName || t.campus || t.year || t.program;
	}
	
	render() {
		return <form className="registration-form" onSubmit={this.onSubmit.bind(this)} style={{maxHeight: this.state.active ? "1000px" : "0", overflow: this.state.isAnimating ? "hidden" : "visible"}}>
					<div className="form-wrapper">
						<div className="form-row-start">
								<TextInput label="Team Name" required={true} onInput={(value) => {this.setState({teamName: value})}}/>
								<TextInput label="Contact Email" required={true} onInput={(value) => {this.setState({email: value})}}/>
						</div>
						{this.makeList().map(function (i) {
							let name = "tm" + i;
							let isRequired = (i < 3) || this.isPartiallyFilled(name);
							return <div>
										<div className="form-label">Team Member #{i}</div>
										<div className="form-row">
											<TextInput label="First Name" required={isRequired} onInput={this.inputOnChange(name, "firstName")} />
											<TextInput label="Last Name" required={isRequired} onInput={this.inputOnChange(name, "lastName")} />
											<YearInput label="Year of Study" required={isRequired} onInput={this.inputOnChange(name, "year")} />
											<ProgramInput label="Program" required={isRequired} onInput={this.inputOnChange(name, "program")} />
											<CampusInput label="Campus" required={isRequired} onInput={this.inputOnChange(name, "campus")} />
										</div>
								</div>
						}.bind(this))}
						
						<div style={{textAlign: "right", paddingRight: "1.367%", marginTop: "20px"}}>
							<input className="col-md-3" type="submit"/>
						</div>
					</div>
				</form>
	}
}

class TeamMemberInputs extends Component {
	
}

class InputWrapper extends Component {
	
	constructor() {
		super();
		this.state = {
			value: null,
		}
	}

	isEmpty() {
		return (this.state.value === "") || (this.state.value === null);
	}

	onInput(event) {
		let newValue = event.target.value;
		this.setState({value: newValue});
		if (this.props.onInput) this.props.onInput(newValue);
	}
	
}

class TextInput extends InputWrapper {
	
	render() {
		return <div className="animated-form col-md-3">
					<input required={this.props.required} className="form-input-basic" data-empty={this.isEmpty()} type="text" onInput={this.onInput.bind(this)}/>
					<label className="animated-form-label">
						{this.props.label}
					</label>
			</div>;
	}
	
}

class DropDownWrapper extends InputWrapper {
	onInput(result) {
		let newValue = result.value;
		this.setState({value: newValue});
		if (this.props.onInput) this.props.onInput(newValue);
	}
}

class YearInput extends DropDownWrapper {

	static yearOptions = ["1", "2", "3", "4", "4+"];
	
	render() {
		return <div className="animated-form-dropdown col-md-1">
					<Dropdown options={YearInput.yearOptions} className={this.isEmpty() ? "inactive" : ""} placeholder={this.state.value || ""} onChange={this.onInput.bind(this)} value={null} />
					<label className="animated-form-label">
						{this.isEmpty() ? this.props.label : "Year"}
					</label>
			</div>
		
	}


}

class ProgramInput extends DropDownWrapper {
	
	static programOptions = ["Computer Science", "Mathematics", "Statistics", "Management", "Engineering"];
	
	render() {
		return <div className="animated-form-dropdown col-md-3">
			<Dropdown options={ProgramInput.programOptions} className={this.isEmpty() ? "inactive" : ""} placeholder={this.state.value || ""} onChange={this.onInput.bind(this)} value={null} />
			<label className="animated-form-label">
				{this.props.label}
			</label>
		</div>;
	}
	
}

class CampusInput extends DropDownWrapper {
	
	static campusOptions = ["UTSG", "UTSC", "UTM"];
	
	render() {
		return <div className="animated-form-dropdown col-md-1">
			<Dropdown options={CampusInput.campusOptions} className={this.isEmpty() ? "inactive" : ""} placeholder={this.state.value || ""} onChange={this.onInput.bind(this)} value={null} />
			<label className="animated-form-label">
				{this.props.label}
			</label>
		</div>
	}
}

class EmailInput extends Component {
	
}

export default Registration;
