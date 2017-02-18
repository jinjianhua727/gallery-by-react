require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
var iamgesData = require('../data/imageDatas.json')
iamgesData = (function (iamgesArr) {
	for (var i = 0; i < iamgesArr.length; i++) {
		var singleImageData =  iamgesArr[i];
		singleImageData.imageURL =require("../images" + singleImageData.fileName);
		iamgesArr[i] = singleImageData;
	}
	return iamgesArr
})(iamgesData)

class AppComponent extends React.Component {
  render() {
    return (
      <section className = "stage">
      	<section className = "img-sec">
      	</section>
      	<nav className = "controller-nav">
      	</nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
