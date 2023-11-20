"use client";
import { useEffect, useState, ChangeEvent } from 'react';
import PropTypes from 'prop-types';

// components
import SearchBar from '../SearchBar/SearchBar';
import TableDropdown from '~/components/componetsDashboard/Dropdowns/TableDropdown';

import useDashboardAdminStore from '~/store/dashboardAdminStore';
import { ProductFilterOptions } from '../SearchBar/SearchBar';


export interface ProductsInterface {
    id: number;
    name: string;
    picture: string;
    category: {
        id: number,
        name: string
    };
    brand: {
        id: number,
        name: string
    };
    stock: number;
    regularPrice: number;
    salePrice: number
};

type CardProductsProps = {
    color: string
};

export default function CardProducts({ color }: CardProductsProps) {


    // GLOBAL STORE:
    const { products, fetchProducts, isProductsFetching, categories, fetchCategories, isCategoriesFetching, brands, fetchBrands, isBrandsFetching, filterProducts }: any = useDashboardAdminStore();


    // LOCAL STATE:
    const [filterMenu, setFilterMenu] = useState<boolean>(false);
    const [filterOptions, setFilterOptions] = useState<ProductFilterOptions>({
        category: "",
        brand: "",
        stock: {
            above: null,
            below: null
        },
        price: {
            above: null,
            below: null
        }
    });


    // FUNCTIONS:
    // Solo cambia el estado, no hace uso del estado global.
    const handleBrandChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const brand = event.target.value;

        setFilterOptions((prevOptions: ProductFilterOptions) => ({
            ...prevOptions,
            brand: brand
        }));
    };

    // Solo cambia el estado, no hace uso del estado global.
    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value;

        setFilterOptions((prevOptions: ProductFilterOptions) => ({
            ...prevOptions,
            category: selectedCategory
        }));
    };

    // Cambia el estado y realiza peticiones a la API.
    const handleFilter = (parameter: "category" | "brand" | null) => {
        setFilterOptions((prevOptions) => {
            // Primero se cambia la propiedad del estado anterior basado en el parámetro.
            let updatedOptions = { ...prevOptions };

            if (parameter === "category") updatedOptions.category = "";
            else if (parameter === "brand") updatedOptions.brand = "";

            // Filtra los productos con el estado que está actualizado.
            filterProducts(updatedOptions);

            return updatedOptions;
        });
    };

    // Limpia el estado local y el estado global.
    const handleClearFilters = () => {
        setFilterOptions({
            category: "",
            brand: "",
            stock: {
                above: null,
                below: null
            },
            price: {
                above: null,
                below: null
            }
        });
        filterProducts(null);
    };

    // LIFE CYCLES:
    useEffect(() => {
        // Se removió "products" del array de dependencias para evitar conflictos cuando se llama a "filterProducts()".
        // El problema viene cuando se filtran los productos pero no se esncuentran resultados. 
        // Con "products" dentro del array de dependencias, el componente haría la petición al servidor para llenar el array de productos nuevamente.
        // Efecto :: Después de que el array de productos se limpia, este "useEffect" se encarga de que lo llene nuevamente.
        if (products.length === 0 && !isProductsFetching) {
            fetchProducts();
        };
    }, [fetchProducts, isProductsFetching]);

    useEffect(() => {
        if (categories.length === 0 && !isCategoriesFetching) {
            fetchCategories();
        };
    }, [categories, fetchCategories, isCategoriesFetching]);

    useEffect(() => {
        if (brands.length === 0 && !isBrandsFetching) {
            fetchBrands();
        };
    }, [brands, fetchBrands, isBrandsFetching]);


    // COMPONENT:
    return (
        <div
            className={
                'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
                (color === 'light' ? 'bg-white' : 'bg-lightBlue-900 text-white')
            }
        >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative flex items-center justify-between w-full px-4 max-w-full flex-grow flex-1">
                        <h3
                            className={
                                'font-semibold text-lg ' +
                                (color === 'light' ? 'text-blueGray-700' : 'text-white')
                            }
                        >
                            Productos
                        </h3>
                        <SearchBar section="product" setFilterMenu={setFilterMenu} />
                    </div>
                </div>
            </div>
            {
                filterMenu ? (
                    <div className="w-full px-8 text-xs">
                        <h3>Filtros:</h3>
                        <div>
                            <span>Categoría:</span>
                            <div className="inline-flex items-center">
                                <select onChange={(e) => handleCategoryChange(e)} value={filterOptions.category}>
                                    <option value="" disabled selected>Selecciona una opción</option>
                                    {
                                        Array.isArray(categories) && categories.map((category: any, idx: any) => (
                                            <option
                                                key={category + idx}
                                                className=""
                                                value={category.name}
                                            >
                                                {category.name}
                                            </option>
                                        ))
                                    }
                                </select>
                                <button onClick={() => handleFilter("category")} >Eliminar</button>
                            </div>
                        </div>
                        <div>
                            <span>Marca:</span>
                            <div className="inline-flex items-center">
                                <select onChange={(e) => handleBrandChange(e)} value={filterOptions.brand}>
                                    <option value="" disabled selected>Selecciona una opción</option>
                                    {
                                        Array.isArray(brands) && brands.map((brand, idx) => (
                                            <option
                                                key={brand + idx}
                                                className=""
                                                value={brand.name}
                                            >
                                                {brand.name}
                                            </option>
                                        ))
                                    }
                                </select>
                                <button onClick={() => handleFilter("brand")}>Eliminar</button>
                            </div>
                        </div>
                        <div><span>Stock:</span>
                        </div>
                        <div><span>Precio:</span>
                        </div>

                        <button onClick={() => handleFilter(null)}>Aplicar filtros</button>
                        <button onClick={handleClearFilters}>Limpiar filtros</button>
                    </div>
                ) : null
            }
            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                        <tr>
                            <th
                                className={
                                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                    (color === 'light'
                                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                            >
                                Id
                            </th>
                            <th
                                className={
                                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                    (color === 'light'
                                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                            >
                                Nombre
                            </th>
                            <th
                                className={
                                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                    (color === 'light'
                                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                            >
                                Categoría
                            </th>
                            <th
                                className={
                                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                    (color === 'light'
                                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                            >
                                Marca
                            </th>
                            <th
                                className={
                                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                    (color === 'light'
                                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                            >
                                Stock
                            </th>
                            <th
                                className={
                                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                    (color === 'light'
                                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                            >
                                Precio regular
                            </th>
                            <th
                                className={
                                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                    (color === 'light'
                                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                            >
                                Precio de oferta
                            </th>
                            <th
                                className={
                                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                    (color === 'light'
                                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                            >
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((PRODUCT: any, idx: any) => (
                                <tr key={idx}>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {PRODUCT.id}
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                        <img
                                            src={PRODUCT.image[0]}
                                            className="h-12 w-12 bg-white rounded-full border"
                                            alt="..."
                                        ></img>
                                        <span
                                            className={
                                                'ml-3 font-bold ' +
                                                +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                                            }
                                        >
                                            {PRODUCT.title}
                                        </span>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {PRODUCT.category.name}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        {PRODUCT.brand.name}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <i className={`fas fa-circle mr-2 ${PRODUCT.stock >= 10 ? "text-[#00FF00]" : PRODUCT.stock >= 5 ? "text-[#FFC107]" : "text-[#FF0000]"}`}></i> {PRODUCT.stock}
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <div className="flex items-center">
                                            <span className="mr-2">{PRODUCT.price}</span>
                                        </div>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                        <div className="flex items-center">
                                            <span className="mr-2">{PRODUCT.price}</span>
                                        </div>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                        <TableDropdown />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};


CardProducts.defaultProps = {
    color: 'light',
};

CardProducts.propTypes = {
    color: PropTypes.oneOf(['light', 'dark']),
};