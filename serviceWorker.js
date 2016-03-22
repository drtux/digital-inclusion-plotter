(global => {
	'use strict';

	/*---- START UP ----*/

	// Load the sw-toolbox library.
	importScripts('assets/vendor/sw-toolbox/sw-toolbox.js');
	importScripts('/_api/_files/hoodie.js');
	importScripts('assets/vendor/mustache.min.js');

	// Ensure that the service worker takes control of the page ASAP.
	global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
	global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));

	//Get templates
	var hoodie = new hoodie();
	hoodie.account.signIn('Template_Engine', 'hri48£haui#wr89y324b7y82bnbasgc7wbqek8erbsb7w')
		.done(window.alert('Login'))
		.fail(window.alert('Fail login'));
	var templates = hoodie.store.findAll('templates');
	var doc = {id:'request', template:"Handled a request for {{url}}, where foo is  {{foo}}"};
	hoodie.store.add('templates', ).publish().then();


	/*---- ROUTING ----*/


	toolbox.router.get('/start/:foo', function(request, values) {
		return new Response(templateEngine(templates.request.template, request, values));
	});

	function templateEngine(template, request, values){
		//"Handled a request for {{url}}, where foo is  {{foo}}";
		//Mustache.parse(template);   // optional, speeds up future uses
		return Mustache.render(template, {foo: values.foo, url:request.url});
	}
	


	// Provide a default handler for GET requests
	toolbox.router.default = global.toolbox.networkOnly;




	addEventListener('message', function handler (event) {
  if (event.data.command === 'requestTemplates') {
    caches.delete(event.data.key);
  }
});

})(self);

