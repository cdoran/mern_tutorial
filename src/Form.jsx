
class CdetsForm extends React.Component {
    render() {
        return <p>CDETS Form</p>
    }
}

class JiraForm extends React.Component {
    render() {
        return <p>Jira Form</p>
    }
}

class CxtaForm extends React.Component {
    render() {
        return <p>CXTM Form</p>
    }
}

class DynamicForm extends React.Component {
    constructor() {
        super();
        this.state = { defect_form: "cdets", sub_form: "existing"};
        this.handleChange = this.handleChange.bind(this);
    }

    linkDefect() {

    }

    submitDefect() {

    }

    handleChange(e){
        this.setState({ defect_form: e.target.value })
    }

    render () {
        return (
            <React.Fragment>
                <form name="defect_type_form">
                    <h1>Add Defect</h1>
                    <h3>Defect Type</h3>
                    <input type="radio" name="defect_type" checked={this.state.defect_form === "cdets"} value="cdets" onChange={this.handleChange}/>CDETS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" name="defect_type" checked={this.state.defect_form === "jira"} value="jira" onChange={this.handleChange}/>Jira&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" name="defect_type" checked={this.state.defect_form === "cxtm"} value="cxtm" onChange={this.handleChange}/>CXTM&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </form>
                <hr/>
                { this.state.defect_form === "cdets" ? <CdetsForm /> : null }
                { this.state.defect_form === "jira" ? <JiraForm/> : null }
                { this.state.defect_form === "cxtm" ? <CxtaForm/> : null }
            </React.Fragment>
        )
    }
}

const element = <DynamicForm />;

ReactDOM.render(element, document.getElementById("content"));