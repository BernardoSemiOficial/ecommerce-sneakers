import "../../components/ProductThumb/styles.scss";
import { useState } from "react";

function ProductThumb({ product }) {

	const [modalProductView, setModalProductView] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);

	const imagesProduct = product.url_images;
	console.log(imagesProduct)

	function openModalProductView() {
		setModalProductView(true);
		document.body.classList.add("no-scroll");
	}
	
	function closeModalProductView() {
		setModalProductView(false);
		document.body.classList.remove("no-scroll");
	}

	function handlePrevImage() {
		setCurrentImage(indexImage => {
			if(indexImage === 0) {
				return imagesProduct.length - 1;
			}
			else {
				return indexImage - 1;
			}
		});
	}

	function handleNextImage() {
		setCurrentImage(indexImage => {
			if(indexImage === imagesProduct.length - 1) {
				return 0;
			}
			else {
				return indexImage + 1;
			}
		});
	}

	function handleSetImagePreview(indexImage) {
		setCurrentImage(indexImage);
	}

	return (
		<section className="sn__product-container">
			
			<figure className="sn__product-thumbs">

				<div className="sn__product-thumb-active">
					<img src={imagesProduct[0]} alt="Sneaker" onClick={openModalProductView} />
				</div>

				<div className="sn_product-thum-thumbnails">
					<img src={imagesProduct[0]} alt="Sneaker" className="active" onClick={openModalProductView} />
					<img src={imagesProduct[1]} alt="Sneaker" onClick={openModalProductView} />
					<img src={imagesProduct[2]} alt="Sneaker" onClick={openModalProductView} />
					<img src={imagesProduct[3]} alt="Sneaker" onClick={openModalProductView} />
				</div>

			</figure>

			{modalProductView ? (
				<div className="sn__product-modal">

					<div className="sn__product-modal-overlay" onClick={closeModalProductView}></div>

					<div className="sn__product-modal-wrapper">

						<button
							className="sn__product-modal-close"
							onClick={closeModalProductView}
						>
							x
						</button>

						<div className="sn__product-thumb-active">
							<img src={imagesProduct[currentImage]} alt="Sneaker" />

							<button
								className="sn__product-thumb-active-btn sn__product-thumb-active-prev"
								onClick={handlePrevImage}
							>
								{"<"}
							</button>

							<button
								className="sn__product-thumb-active-btn sn__product-thumb-active-next"
								onClick={handleNextImage}
							>
								{">"}
							</button>
						</div>

						<div className="sn_product-thum-thumbnails">
							<img 
								src={imagesProduct[0]} 
								alt="Sneaker" 
								className={currentImage === 0 ? "active" : ""} 
								onClick={() => handleSetImagePreview(0)} 
							/>
							
							<img 
								src={imagesProduct[1]} 
								alt="Sneaker" 
								className={currentImage === 1 ? "active" : ""} 
								onClick={() => handleSetImagePreview(1)} 
							/>
							
							<img 
								src={imagesProduct[2]} 
								alt="Sneaker" 
								className={currentImage === 2 ? "active" : ""} 
								onClick={() => handleSetImagePreview(2)} 
							/>
							
							<img 
								src={imagesProduct[3]} 
								alt="Sneaker" 
								className={currentImage === 3 ? "active" : ""} 
								onClick={() => handleSetImagePreview(3)} 
							/>
							
						</div>

					</div>

				</div>
			) : null}

		</section>
	);
}

export default ProductThumb;