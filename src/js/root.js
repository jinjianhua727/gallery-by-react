import React from 'react';
import ReactDom from 'react-dom';
// import imageDates from '../data/imageDates.json';
import imageDates from './test.json';
// console.log(imageDates)
// 获取图片数据
var imagedates = (function(imageDatesArr){
	for (var i = 0; i < imageDatesArr.length; i++) {
		var singleImageData = imageDatesArr[i]

		singleImageData.imageURL = require("../images/" + singleImageData.fileName)
		imageDatesArr[i] = singleImageData
	}
	return imageDatesArr
})(imageDates)

export default class Root extends React.Component{
	render(){
		return(
			<section className = "state">
				<section className="img-sec">

				</section>
				<nav className="controller-nav">

				</nav>
			</section>
		);
	};
}
ReactDom.render(<Root/>,document.getElementById('root'))