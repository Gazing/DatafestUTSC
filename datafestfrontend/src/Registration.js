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
			teamName: null,
			email: null,
			tm1: {
				firstName: null,
				lastName: null,
				year: null,
				program: null,
				campus: null
			},
			tm2: {
				firstName: null,
				lastName: null,
				year: null,
				program: null,
				campus: null
			},
			tm3: {
				firstName: null,
				lastName: null,
				year: null,
				program: null,
				campus: null
			}

		};
		
	}
	
	componentDidMount() {
		setTimeout(function () {
			this.setState({active: true});
			setTimeout(function () {
				this.setState({isAnimating: false});
			}.bind(this), 700)
		}.bind(this), 300)
	}
	
	inputOnChange(tm, binding) {
		return function (newValue) {
			let t = this.state[tm];
			t[binding] = newValue;
			let temp = {};
			temp[tm] = t;
			this.setState(temp);
		}.bind(this);
	};
	
	onSubmit(e) {
		e.preventDefault();
		let tm1 = this.state.tm1;
		tm1.name = {first: tm1.firstName, last: tm1.lastName};
		let tm2 = this.state.tm2;
		tm2.name = {first: tm2.firstName, last: tm2.lastName};
		let tm3 = this.state.tm3;
		tm3.name = {first: tm3.firstName, last: tm3.lastName};
		Actions.onSubmitRegistration({
			teamName: this.state.teamName,
			email: this.state.email,
			tm1: tm1,
			tm2: tm2,
			tm3: tm3
		}, this.props.onResult);
	}
	

	
	render() {
		return <form className="registration-form" onSubmit={this.onSubmit.bind(this)} style={{maxHeight: this.state.active ? "1000px" : "0", overflow: this.state.isAnimating ? "hidden" : "visible"}}>
					<div className="form-wrapper">
						<div className="form-row-start">
								<TextInput label="Team Name" required={true} onInput={(value) => {this.setState({teamName: value})}}/>
								<TextInput label="Contact Email" required={true} onInput={(value) => {this.setState({email: value})}}/>
						</div>
						<div>
							<div className="form-label">Team Member #1</div>
							<div className="form-row">
								<TextInput label="First Name" required={true} onInput={this.inputOnChange("tm1", "firstName")} />
								<TextInput label="Last Name" required={true} onInput={this.inputOnChange("tm1", "lastName")} />
								<YearInput label="Year of Study" required={true} onInput={this.inputOnChange("tm1", "year")} />
								<ProgramInput label="Program" required={true} onInput={this.inputOnChange("tm1", "program")} />
								<CampusInput label="Campus" required={true} onInput={this.inputOnChange("tm1", "campus")} />
							</div>
							
						</div>
						<div>
							<div className="form-label">Team Member #2</div>
							<div className="form-row">
								<TextInput label="First Name" required={true} onInput={this.inputOnChange("tm2", "firstName")} />
								<TextInput label="Last Name" required={true} onInput={this.inputOnChange("tm2", "lastName")} />
								<YearInput label="Year of Study" required={true} onInput={this.inputOnChange("tm2", "year")} />
								<ProgramInput label="Program" required={true} onInput={this.inputOnChange("tm2", "program")} />
								<CampusInput label="Campus" required={true} onInput={this.inputOnChange("tm2", "campus")} />
							</div>
	
						</div>
						<div>
							<div className="form-label">Team Member #3</div>
							<div className="form-row">
								<TextInput label="First Name" onInput={this.inputOnChange("tm3", "firstName")} />
								<TextInput label="Last Name" onInput={this.inputOnChange("tm3", "lastName")} />
								<YearInput label="Year of Study" onInput={this.inputOnChange("tm3", "year")} />
								<ProgramInput label="Program" onInput={this.inputOnChange("tm3", "program")} />
								<CampusInput label="Campus" onInput={this.inputOnChange("tm3", "campus")} />
							</div>
	
						</div>
						
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
