import React from "react";
import ReactDOM from "react-dom";
import { Container } from "react-bulma-components/full";

class SearchApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    });
  }

  render() {
    return (
      <Container>
        <h1 className="title">This is a simple Search app</h1>
        <SearchBox
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </Container>
    );
  }
}

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          className="input"
          type="text"
          placeholder="Search ..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <br />
        <input
          type="checkbox"
          checked={this.props.inStockOnly}
          onChange={this.handleInStockChange}
        />
        Only show products in stock
      </form>
    );
  }
}

function ProductTable(props) {
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;

  const rows = [];
  let categories = props.products.map(product => product.category);
  const category = [...new Set(categories)];

  category.forEach(cat => {
    rows.push(<ProductCategory key={cat} category={cat} />);
    props.products.forEach(product => {
      if (product.name.toUpperCase().indexOf(filterText.toUpperCase()) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (cat === product.category) {
        rows.push(<ProductItem key={product.name} product={product} />);
      }
    });
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategory(props) {
  return (
    <tr>
      <th>{props.category}</th>
    </tr>
  );
}

function ProductItem(props) {
  const product = props.product;
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football"
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball"
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball"
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5"
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

ReactDOM.render(
  <SearchApp products={PRODUCTS} />,
  document.getElementById("root")
);
