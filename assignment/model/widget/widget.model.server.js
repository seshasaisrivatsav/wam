
// this API for the database
//encapsulate all CRUD operations in this
//Only database operations happen here
module.exports = function () {

    var mongoose = require ("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget =  mongoose.model("Widget", WidgetSchema); //mongo plurarizes
    
    var api = {
        findAllWidgetsForPage: findAllWidgetsForPage,
        updateWidget: updateWidget,
        createWidget: createWidget,
        findWidgetById: findWidgetById,
        deleteWidget: deleteWidget
    };
    return api;

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function updateWidget(widgetId, widget) {
       // delete widget._id;
        return Widget
            .update({_id: widgetId},{
                $set : widget
            })
    }

    function createWidget(pageId, widget)  {
       widget._page = pageId;
       console.log(widget);
        return Widget.create(widget);
    }
    
    function findWidgetById(widgetId) {
        return Widget.findById (widgetId);
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

};