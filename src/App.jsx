
class HelloWorld extends React.Component {

  render() {
  
    const continents = ['Africa', 'North America', 'South America', 'Asia', 'Australia', 'Europe'];
    const helloContinents = Array.from(continents, c => `Hello ${c},`);
    const message = helloContinents.join(' ');
    
    return (
      <div>
        <h1 className="crazy-cat">{message}</h1>
      </div>
    );
  }
}

const element = <HelloWorld />;

ReactDOM.render(element, document.getElementById("content"));
