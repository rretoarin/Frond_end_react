const Product = (props) =>
    (
        <div className="product">
            <h2>{props.title}</h2>
            <div>{props.children}</div>
        </div>
    );

export default Product;