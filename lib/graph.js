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
	},
	pathBetween : function(from,to,visited){
		var visited = visited || []; 
		if(from == to){
			return visited.concat(from);
		}
		for(var index in this.edges[from]){
			var vertex = this.edges[from][index];
			if(visited.indexOf(vertex)>=0)
				vertex = this.edges[from][index+1]
			var path = this.pathBetween(vertex,to,visited.concat(from));
			if(path.length)
				return path;
		}
		return [];
	},
	farthestVertex : function(from){
		var vertices = Object.keys(this.edges);
		var lengths = [];
		for(var i = 0;i < vertices.length;i++){
			lengths.push(this.pathBetween(from,vertices[i]).length);
		}
		var index = lengths.indexOf(Math.max.apply(null,lengths));
		return vertices[index];
	},
	allPaths : function(from,to,visited,paths){
		var paths = paths || [];
		var visited = visited || []; 
		if(from == to){
			return visited.concat(from);
		}
		for(var index in this.edges[from]){
			var vertex = this.edges[from][index];
			if(visited.indexOf(vertex)==-1){
				var path = this.allPaths(vertex,to,visited.concat(from),paths)
				if(path[path.length-1]==to)
					paths.push(path);
			}
		}
		return paths;
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
	},
	pathBetween : function(from,to,visited){
		var visited = visited || []; 
		if(from == to){
			return visited.concat(from);
		}
		for(var index in this.edges[from]){
			var vertex = this.edges[from][index];
			if(visited.indexOf(vertex)>=0)
				vertex = this.edges[from][index+1]
			var path = this.pathBetween(vertex,to,visited.concat(from))
			if(path.length)
				return path;
		}
		return [];
	},
	farthestVertex : function(from){
		var vertices = [],lengths = [];
		var edges = this.edges;
		var edgeStarts = Object.keys(this.edges);
		edgeStarts.forEach(function(edge){
			for(var i in edges[edge]){
				vertices.push(edges[edge][i]);
			 }
		});
		for(var i = 0;i < vertices.length;i++){
			lengths.push(this.pathBetween(from,vertices[i]).length);
		}
		var index = lengths.indexOf(Math.max.apply(null,lengths));
		return vertices[index];
	},
	allPaths : function(from,to,visited,paths){
		var paths = paths || [];
		var visited = visited || []; 
		if(from == to){
			return visited.concat(from);
		}
		for(var index in this.edges[from]){
			var vertex = this.edges[from][index];
			if(visited.indexOf(vertex)==-1){
				var path = this.allPaths(vertex,to,visited.concat(from),paths)
				if(path[path.length-1]==to)
					paths.push(path);
			}
		}
		return paths;
	}
};

module.exports = graphs;