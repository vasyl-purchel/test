let system = client.registerSystem(0,0);

system.showLogEntry = function (msg) {
    let eventData = system.createEventData("minecraft:display_chat_event");
    if (eventData) {
        eventData.data.message = msg;
        system.broadcastEvent("minecraft:display_chat_event", eventData);
    }
};

system.initialize = function() {
    system.listenForEvent("minecraft:client_entered_world", (eventData) => system.onClientEnteredWorld(eventData));
    system.listenForEvent("minecraft:ui_event", (eventData) => system.onUIMessage(eventData));
    system.listenForEvent("minecraft:entity_use_item", (eventData) => system.onEntityUseItem(eventData));
};

system.onClientEnteredWorld = function (eventData) {
    system.showLogEntry("onClientEnteredWorld: start");
    let loadEventData = system.createEventData("minecraft:load_ui");
    loadEventData.data.path = "advancements.html";
    loadEventData.data.options.is_showing_menu = false;
    loadEventData.data.options.absorbs_input = true;
    system.broadcastEvent("minecraft:load_ui", loadEventData);
    system.showLogEntry("onClientEnteredWorld: ui should be loaded!");
};

system.onUIMessage = function (eventDataObject) {
    let eventData = eventDataObject.data;
    if (!eventData) {
        // nothing to do here...
        return;
    }

    if (eventData === "agesminecraft:closeAdvancements") {
        let unloadEventData = system.createEventData("minecraft:unload_ui");
        unloadEventData.data.path = "advancements.html";
        system.broadcastEvent("minecraft:unload_ui", unloadEventData);
    }
};

system.onEntityUseItem = function (eventDataObject) {
    system.showLogEntry("onEntityUseItem: start");
    let eventData = eventDataObject.data;
    if (!eventData) {
        // nothing to do here...
        return;
    }

    system.showLogEntry("onEntityUseItem: got eventData");
    let entity = eventData.entity;
    system.showLogEntry("onEntityUseItem: (entity) id=" + entity.id + ", __identifier__=" + entity.__identifier__ + ", __type__=" + entity.__type__);

    let use_method = eventData.use_method;
    system.showLogEntry("onEntityUseItem: use_method=" + use_method);

    let item_stack = eventData.item_stack;
    system.showLogEntry("onEntityUseItem: (item_stack) item=" + item_stack.item);
};
