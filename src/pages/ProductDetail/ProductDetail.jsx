import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import styles from './ProductDetail.module.css';
import Footer from '../../components/Footer/Footer';
import { ALL_PRODUCTS } from '../../data/products';

const WHATSAPP = '96176941478';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWished } = useWishlist();
  const product =
    ALL_PRODUCTS.find((p) => p.id === parseInt(id)) || ALL_PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const related = ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.cat === product.cat
  ).slice(0, 4);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const waText = encodeURIComponent(
    'Hi SECOND! I want to buy: ' +
      product.name +
      ' by ' +
      product.brand +
      ' | Size: ' +
      selectedSize +
      ' | Color: ' +
      selectedColor +
      ' | Price: $' +
      product.priceUSD
  );
  const waLink = 'https://wa.me/' + WHATSAPP + '?text=' + waText;

  return (
    <React.Fragment>
      <div className={styles.page}>
        <div className={styles.breadcrumb}>
          <span onClick={() => navigate('/')} className={styles.crumb}>
            Home
          </span>
          <span className={styles.sep}>›</span>
          <span
            onClick={() => navigate('/' + product.cat.toLowerCase())}
            className={styles.crumb}
          >
            {product.cat}
          </span>
          <span className={styles.sep}>›</span>
          <span className={styles.crumbActive}>{product.name}</span>
        </div>
        <div className={styles.main}>
          <div className={styles.imageWrap}>
            <div className={styles.imageBig}>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImg}
                />
              ) : (
                <span className={styles.imageIcon}>{product.icon}</span>
              )}
              {product.badge ? (
                <span className={styles.badge}>{product.badge}</span>
              ) : null}
            </div>
            <div className={styles.thumbs}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={
                    activeImg === i ? styles.thumbActive : styles.thumb
                  }
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt=""
                      className={styles.thumbImg}
                    />
                  ) : (
                    <span>{product.icon}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.info}>
            <span className={styles.brand}>{product.brand}</span>
            <h1 className={styles.name}>{product.name}</h1>
            <div className={styles.priceWrap}>
              {product.oldPrice ? (
                <span className={styles.oldPrice}>
                  ${product.oldPrice.toLocaleString()}
                </span>
              ) : null}
              <span className={styles.price}>
                ${product.priceUSD.toLocaleString()}
              </span>
              <span className={styles.priceLBP}>
                approx {product.priceLBP} LBP
              </span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.optionGroup}>
              <p className={styles.optionLabel}>
                Color{' '}
                <span className={styles.optionValue}>{selectedColor}</span>
              </p>
              <div className={styles.options}>
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={
                      selectedColor === c
                        ? styles.optionActive
                        : styles.optionBtn
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.optionGroup}>
              <p className={styles.optionLabel}>
                Size <span className={styles.optionValue}>{selectedSize}</span>
              </p>
              <div className={styles.options}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={
                      selectedSize === s
                        ? styles.optionActive
                        : styles.optionBtn
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.actions}>
              <button
                onClick={handleAdd}
                className={added ? styles.btnAdded : styles.btnAdd}
              >
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={
                  isWished(product.id) ? styles.btnWished : styles.btnWish
                }
              >
                {isWished(product.id) ? '♥' : '♡'}
              </button>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWhatsapp}
            >
              <i className="ti ti-brand-whatsapp"></i> Order via WhatsApp
            </a>
            <div className={styles.divider}></div>
            <p className={styles.desc}>{product.desc}</p>
            <div className={styles.detailsWrap}>
              <p className={styles.detailsTitle}>Details</p>
              <ul className={styles.detailsList}>
                {product.details &&
                  product.details.map((d) => (
                    <li key={d} className={styles.detailItem}>
                      — {d}
                    </li>
                  ))}
              </ul>
            </div>
            <div className={styles.trust}>
              <div className={styles.trustItem}>
                <i className="ti ti-shield-check"></i>
                <span>100% Authentic</span>
              </div>
              <div className={styles.trustItem}>
                <i className="ti ti-truck-delivery"></i>
                <span>Free Shipping</span>
              </div>
              <div className={styles.trustItem}>
                <i className="ti ti-refresh"></i>
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
        {related.length > 0 ? (
          <div className={styles.related}>
            <span className={styles.relatedLabel}>You May Also Like</span>
            <h2 className={styles.relatedTitle}>
              Related <em>Items</em>
            </h2>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <div
                  key={p.id}
                  className={styles.relatedCard}
                  onClick={() => navigate('/product/' + p.id)}
                >
                  <div className={styles.relatedImg}>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className={styles.relatedImgReal}
                      />
                    ) : (
                      <span className={styles.relatedIcon}>{p.icon}</span>
                    )}
                  </div>
                  <p className={styles.relatedBrand}>{p.brand}</p>
                  <p className={styles.relatedName}>{p.name}</p>
                  <p className={styles.relatedPrice}>
                    ${p.priceUSD.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
    </React.Fragment>
  );
}
