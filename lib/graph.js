var graphs = {};

graphs.UndirectedGraph = function(){
	this.vertices = [];
	this.edges = {};
};

graphs.UndirectedGraph.prototype = {
	addVertex : function(vertex){
		this.vertices.push(vertex);
	},
	addEdge : function(from,to){
		this.edges[from] = this.edges[from] || [];
		this.edges[from].push(to);
		this.edges[to] = this.edges[to] || [];
		this.edges[to].push(from);
	},
	hasEdgeBetween : function(from,to){
		return Object.keys(this.edges).indexOf(from)!= -1;
	},
	order : function(){
		return this.vertices.length;
	},
	size : function(){
		var sizeOfEdges = 0;
		var edges = this.edges;
		var edgeStarts = Object.keys(this.edges);
		edgeStarts.forEach(function(edge){
			sizeOfEdges+=edges[edge].length;
		});
		return sizeOfEdges/2;
	}
};

graphs.DirectedGraph = function(){
	this.vertices = [];
	this.edges = {};
};

graphs.DirectedGraph.prototype = {
	addVertex : function(vertex){
		this.vertices.push(vertex);
	},
	addEdge : function(from,to){
		this.edges[from] = this.edges[from] || [];
		this.edges[from].push(to);
	},
	hasEdgeBetween : function(from,to){
		return Object.keys(this.edges).indexOf(from)!= -1;
	},
	order : function(){
		return this.vertices.length;
	},
	size : function(){
		var sizeOfEdges = 0;
		var edges = this.edges;
		var edgeStarts = Object.keys(this.edges);
		edgeStarts.forEach(function(edge){
			sizeOfEdges+=edges[edge].length;
		});
		return sizeOfEdges;
	}
};

module.exports = graphs;