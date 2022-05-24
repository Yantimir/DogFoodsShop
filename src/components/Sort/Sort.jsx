import React, { useState } from "react";
import classNames from "classnames";
import style from "./style.module.css";

export const Sort = ({ tabs, onChangeSort }) => {
	
	const [currentSort, setCurrentSort] = useState("");


	return (
		<div className={classNames(style.sort, style["content__sort"])}>
			{tabs.map((tab) => {
				return (
					<button 
						key={tab.id}
						className={classNames(style.link, {
							[style["link_selected"]]: currentSort === tab.id
						})}
						onClick={()=> { onChangeSort(tab.id); 
							setCurrentSort(tab.id)
						}}
					>
						{tab.title}
					</button>
				)
			})}
		</div>
		// <div className={style.sort + " content__sort"}>
		// 	<a href="#" className={classnames(style.link, style["link_selected"])}>Популярные</a>
		// 	<a href="#" className={style.link}>Новинки</a>
		// 	<a href="#" className={style.link}>Сначала дешёвые</a>
		// 	<a href="#" className={style.link}>Сначала дорогие</a>
		// 	<a href="#" className={style.link}>По рейтингу</a>
		// 	<a href="#" className={style.link}>По скидке</a>
		// </div>
	);
};