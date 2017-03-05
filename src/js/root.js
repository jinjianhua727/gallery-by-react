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
// console.log(imagedates)

// 取lower与high之间的随机整数
function getRangeRandom(low,high) {
	return Math.ceil(Math.random() * (high -low) + low)
}
function get30DegRandom() {
	 return (Math.random() > 0.5 ? '':'-') + Math.ceil(Math.random() * 30)
}
class ImgFigure extends React.Component{

	handleClick(e){
		// console.log(this.props.arrange.isCenter)
		if (this.props.arrange.isCenter) {
			this.props.inverse();
		}else {
			this.props.center()
		}
		
		e.stopPropagation();
		e.preventDefault();
	}
	render(){
		// console.log(this.props.arrange.pos)
		var styleObj = {};
		if (this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}
		if (this.props.arrange.rotate) {
			(['MozTransform','msTransform','webkitTransform','transform']).forEach(function (value) {
				styleObj[value] = 'rotate('+this.props.arrange.rotate+'deg)'
			}.bind(this))
			
		}
		if (this.props.arrange.isCenter) {
			styleObj.zIndex = 11
		}

		var imgFigureClassName = 'img-figure';
		imgFigureClassName += this.props.arrange.isInverse?' is-inverse' : ''
		// console.log(styleObj)
		return(
			<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className='img-back' onClick={this.handleClick}>
						<p>{this.props.data.desc}</p>
					</div>
				</figcaption>
			</figure>
		)
	}
}
class ControllerUnits extends React.Component{
	handleClick(e){
		if (this.props.arrange.isCenter) {
			this.props.inverse();
		}else {
			this.props.center()
		}

		e.preventDefault()
		e.stopPropagation()
	}
	render(){
		var controllerUnitClassName = 'controller-unit'
		if (this.props.arrange.isCenter) {
			controllerUnitClassName += ' is-center'
			if (this.props.arrange.isInverse) {
				controllerUnitClassName += ' is-inverse'
			}
		}
		return (
			<span className={controllerUnitClassName} onClick={this.handleClick.bind(this)}></span>
		)
	}
}
class Root extends React.Component{
	

	constructor(){
		super()
		this.state = {
			imgsArrangeArr : [
				// {
				// 	pos:{
				// 		left : '0',
				// 		top : '0'
				// 	}
				// }
			]
		}
	}
	inverse(index){
		return function () {
			var imgsArrangeArr = this.state.imgsArrangeArr;
			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
			
			this.setState({
				imgsArrangeArr : imgsArrangeArr
			})
		}.bind(this)
	}
	rearrange(centerIndex){
		var imgsArrangeArr = this.state.imgsArrangeArr,
		Constant = this.props.Constant,
		centerPos =Constant.centerPos,
		hPosRange =Constant.hPosRange,
		vPosRange = Constant.vPosRange,
		hPosRangeLeftSecX = hPosRange.leftSecX,
		hPosRangeRightSecX = hPosRange.rightSecX,
		hPosRangeY = hPosRange.y,
		vPosRangeTopY = vPosRange.topY,
		vPosRangeX = vPosRange.x,
		imgsArrangeTopArr = [],
		topImgNum = Math.floor(Math.random() * 2),
		topImgSpliceIndex = 0,
		imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
		// console.log(Constant)
		// console.log(imgsArrangeArr)
		// 首先居中centerIndex的图片
		imgsArrangeCenterArr[0] = {
			pos : centerPos,
			rotate : 0,
			isCenter : true
		}

		// 取出上侧图片的状态信息
		topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum))
		imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum)

		// 布局位于上侧的图片
		imgsArrangeTopArr.forEach(function (value,index) {
			imgsArrangeTopArr[index] = {
				pos : {
					top : getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
					left : getRangeRandom(vPosRangeX[0],vPosRangeX[1])
				},
				rotate : get30DegRandom(),
				isCenter : false
			}
		})
		
		// 布局两侧的图片
		for (var i = 0 ,j = imgsArrangeArr.length, k = j/2; i < j; i++) {
			var hPosRangeLORX = null;
			if (i<k) {
				hPosRangeLORX = hPosRangeLeftSecX
			}else{
				hPosRangeLORX = hPosRangeRightSecX
			}

			imgsArrangeArr[i] = {
				pos : {
					top : getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
					left : getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
				},
				rotate : get30DegRandom(),
				isCenter : false
			}
		}
		
		if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
			imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0])
		}

		imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0])

		this.setState({
			imgsArrangeArr : imgsArrangeArr
		})
	}

	center(index){
		return function () {
			this.rearrange(index)
		}.bind(this)
	}
	componentDidMount(){
		var stateDom = this.refs.state,
		stateW =  stateDom.scrollWidth,
		stateH = stateDom.scrollHeight,
		halfStateW = Math.ceil(stateW/2),
		halfStateH = Math.ceil(stateH/2)

		var imgFigureDom = ReactDom.findDOMNode(this.refs.imgFigure0),
		imgW = imgFigureDom.scrollWidth,
		imgH = imgFigureDom.scrollHeight,
		halfImgW= Math.ceil(imgW/2),
		halfImgH = Math.ceil(imgH/2)
		// console.log(halfImgW)
		// console.log(halfImgH)
		this.props.Constant.centerPos = {
			left : halfStateW - halfImgW,
			top : halfStateH - halfImgH
		}
		this.props.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.props.Constant.hPosRange.leftSecX[1] = halfStateW - halfImgW*3
		this.props.Constant.hPosRange.rightSecX[0] = halfStateW + halfImgW
		this.props.Constant.hPosRange.rightSecX[1] = stateW - halfImgW;
		this.props.Constant.hPosRange.y[0] =-halfImgH
		this.props.Constant.hPosRange.y[1] = stateH -halfImgH

		this.props.Constant.vPosRange.topY[0] = -halfImgH
		this.props.Constant.vPosRange.topY[1] = halfStateH -halfImgH * 3
		this.props.Constant.vPosRange.x[0] = halfStateW -imgW
		this.props.Constant.vPosRange.x[1] = halfImgW

		this.rearrange(0)
	}
	render(){
		const controllerUnits = [],
		imgFigures = [];
		imagedates.forEach(function (value,index) {
			if (!this.state.imgsArrangeArr[index]) {
				this.state.imgsArrangeArr[index] = {
					pos : {
						left : 0,
						top : 0
					},
					rotate : 0,
					isInverse : false,
					isCenter : false
				}
			}
			imgFigures.push(<ImgFigure key={index} ref={'imgFigure' + index} center={this.center(index)} inverse={this.inverse(index)} arrange={this.state.imgsArrangeArr[index]} data={value} />)
			controllerUnits.push(<ControllerUnits key={index} center={this.center(index)} inverse={this.inverse(index)} arrange={this.state.imgsArrangeArr[index]}/>)
		}.bind(this))
		// console.log(imgFigures)
		return(
			<section className = "state" ref="state">
				<section className="img-sec">
					{imgFigures}
				</section>
				<nav className="controller-nav">
					{controllerUnits}
				</nav>
			</section>
		);
	};
}

Root.defaultProps  = {
	Constant : {
		centerPos : {
			left : 0,
			right : 0
		},
		hPosRange : {
			leftSecX : [0,0],
			rightSecX : [0,0],
			y:[0,0]
		},
		vPosRange : {
			x : [0,0],
			topY : [0,0]
		}
	}
}
ReactDom.render(<Root/>,document.getElementById('root'))