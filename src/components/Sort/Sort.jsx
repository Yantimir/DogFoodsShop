import React, {useState} from "react";
import "./style.css";
// import  cn  from 'classnames';


export const Sort = ({ tabs, onChageSort }) => {
	const [currentSort, setCurrentSort] = useState("")

	return (
		// <div className="sort content__sort">
		// 	{tabs.map((tab) => {
		// 		return (
		// 			<button 
		// 				key={tab.id}
		// 				className={cn('sort__link', {
		// 					'sort__link_selected': currentSort === tab.id
		// 				})}
		// 				onClick={()=> { onChageSort(tab.id); setCurrentSort(tab.id)}}
		// 			>
		// 				{tab.title}
		// 			</button>
		// 		)
		// 	})}
		// </div>
		<div className="sort content__sort">
			
			<a href="#" className="sort__link">Новинки</a>
			<a href="#" className="sort__link">Сначала дешёвые</a>
			<a href="#" className="sort__link">Сначала дорогие</a>
			<a href="#" className="sort__link">По рейтингу</a>
			<a href="#" className="sort__link">По скидке</a>
		</div>
	);
};