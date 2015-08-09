App.LeadsRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('lead');
    }
});

App.LeadRoute = Ember.Route.extend({
    model: function(params) { return this.store.find('lead', params.id) }
});

App.LeadEditRoute = Ember.Route.extend({

    activate: function() {this.controllerFor('lead').set('isEditing', true)},
    deactivate: function() {this.controllerFor('lead').set('isEditing', false)}
});

App.LeadsNewRoute = Ember.Route.extend({

    setupController: function(controller) {
        controller.set('fields', {});
        controller.set('showError', false);
    }
});