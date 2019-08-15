const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}


class IssueFilter extends React.Component {
  render() {
    return (
      <div>filter placeholder</div>
    );
  }
}

class IssueTable extends React.Component {
  
  render() {
    const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue}/>);
    return (
      <table className="bordered-table">
       <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Due Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {issueRows}
        </tbody>
      </table>
    );
  }
}

class IssueRow extends React.Component {

  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.due ? issue.due.toDateString() : ''}</td>
        <td>{issue.title}</td>
      </tr>
    );
  }

}

class IssueAdd extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {status: "New", owner: form.owner.value, 
                   title: form.title.value};
    this.props.createIssue(issue);
    form.owner.value = "";
    form.title.value = "";
  }

  render() {
    return (
      <form name="issueAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="owner" placeholder="Owner"/>
        <input type="text" name="title" placeholder="Title"/>
        <button>Add Issue</button>
      </form>
    );
  }

}

class IssueList extends React.Component {

  constructor() {
    super();
    this.state = {issues: []};
    this.createIssue = this.createIssue.bind(this)
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      issueList {
        id title status owner 
        created effort due
      }
    }`;

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ query })
    });

    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);
    this.setState({ issues: result.data.issueList });
  }

  createIssue(issue) {
    issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    let issues = this.state.issues.slice();
    issues.push(issue);
    this.setState({issues: issues}); 
  }

  render () {
    return ( 
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter/>
        <hr/>
        <IssueTable issues={this.state.issues}/>
        <hr/>
        <IssueAdd createIssue={this.createIssue}/>
      </React.Fragment>
    );
  }

}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById("content"));
