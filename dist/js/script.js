Engine.Plugins.services = {
	element:{
		table:{
			index:{},
		},
	},
	init:function(){
		Engine.GUI.Sidebar.Nav.add('Services', 'development');
	},
	load:{
		index:function(){
			Engine.Builder.card($('#pagecontent'),{ title: 'Services', icon: 'services'}, function(card){
				Engine.request('services','read',{
					data:{options:{ link_to:'ServicesIndex',plugin:'services',view:'index' }},
				},function(result) {
					var dataset = JSON.parse(result);
					if(dataset.success != undefined){
						for(const [key, value] of Object.entries(dataset.output.dom)){ Engine.Helper.set(Engine.Contents,['data','dom','services',value.name],value); }
						for(const [key, value] of Object.entries(dataset.output.raw)){ Engine.Helper.set(Engine.Contents,['data','raw','services',value.name],value); }
						Engine.Builder.table(card.children('.card-body'), dataset.output.dom, {
							headers:dataset.output.headers,
							id:'ServicesIndex',
							modal:true,
							key:'name',
							clickable:{ enable:true, view:'details'},
							controls:{ toolbar:true},
							import:{ key:'id', },
						},function(response){
							Engine.Plugins.services.element.table.index = response.table;
						});
					}
				});
			});
		},
		details:function(){
			var url = new URL(window.location.href);
			var id = url.searchParams.get("id"), values = '';
			setTimeout(function() {
				$("[data-plugin="+url.searchParams.get("p")+"][data-key]").each(function(){
					values += $(this).html();
				});
				if(values == ''){
					Engine.request('services','read',{data:{id:id,key:'name'}},function(result){
						var dataset = JSON.parse(result);
						if(dataset.success != undefined){
							Engine.GUI.insert(dataset.output.dom);
						}
					});
				}
			}, 1000);
		},
	},
	extend:{},
}

Engine.Plugins.services.init();
