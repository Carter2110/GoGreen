'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Go Green';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var allTIPS = [
    //Water
	"Put a bucket in the shower while you're waiting for the water to warm up, and use the water you catch for watering plants, flushing the toilet or cleaning.",
    "Install a low-flow showerhead. It may cost you some money up front, but your water conservation efforts will save you money down the road. Conventional showerheads flow at 5 gallons per minute or more, whereas low-flow showerheads typically flow at 2.5 gallons per minute.",
    "Turn off the water if you shave or brush your teeth in the shower",
    "Think of baths as an occasional treat and stick to showers. The average bath uses 35 to 50 gallons of water, whereas a 10-minute shower with a low-flow showerhead only uses 25 gallons.",
    "Fix those leaky faucets. That constant drip is more than just annoying; it’s also a huge waste of water. You can lose more than 20 gallons of water a day from a single drippy faucet!",
    "If you can’t replace your higher volume toilet, put a plastic bottle filled with water in your toilet tank to reduce the amount of water used per flush.",
    "To check for a toilet leak, put dye or food coloring into the tank. If color appears in the bowl without flushing, there’s a leak that should be repaired.",
    "Don’t flush things down the toilet to dispose of them. Throw tissues and other bathroom waste in the garbage can, which doesn’t require gallons of water.",
    "Read the house water meter before and after a two-hour period when no water is being used. If the meter does not read exactly the same, there is a leak.",
    "You should try to keep showers under 5 minutes.",
    "If it’s yellow, let it mellow. This tip might not be for everyone, but the toilet is one of the most water-intensive fixtures in the house. Do you need to flush every time?",
    "If you feel compelled to wash your car, take it to a car wash that recycles the water, rather than washing at home with the hose.",
    "Install a rain barrel. Rainwater harvesting is a great way to keep your plants hydrated without turning on the hose or sprinkler.",
    "Older toilets use a lot of water. You can reduce your water usage by sinking a half gallon jug of water in the toilet tank.",
    "When hand washing dishes, fill up your sink with water, instead of letting it run the whole time that you’re scrubbing.",
    "Whether you're at home or at a hotel, reuse your towels to cut back on washer and drier use.",
    //Pollution
    "Bike or walk instead of driving. Every 25 miles you don't drive prevents a pound of pollution.",
    "Consider using solar energy in your house. Solar energy prevents water and air pollution associated with burning fossil fuels for energy.",
    "Recycle burned out fluorescent lamps at a Household Hazardous Waste Collection Center. Fluorescent lamps may contain mercury.",
    "Choose earth friendly lawn care methods & products. When using chemicals, follow package instructions for use and disposal. Excess chemicals can destroy beneficial insects. If in doubt, ask an expert.",
    "Consider using a push mower for your lawn. No air pollution, minimal maintenance & good exercise.",
    "Leaving small grass clippings on the lawn, a.k.a. grasscycling, provides nutrients to the soil, creates healthy lawns and diverts yard debris from the landfill.",
    "Commercially available eco-lawn mixes can reduce watering and yard maintenance.",
    "Plant trees! They provide shade, clean air, mask noise and need much less water than lawns.",
    "Consider plastic lumber for a deck or bench. Recycled content plastic lumber is durable and requires no painting",
    "Create a backyard compost pile, or invest in a composter. Composting is nature's way of recycling. It converts plant waste into a rich soil additive.",
    "Avoid aerosol products. They can pose safety hazards and require special processing at the Household Hazardous Waste Collection Center.",
    "Use a durable canvas grocery bag. REUSE IS BETTER THAN RECYCLING. Canvas bags reduce the amount of disposable or recyclable bags we consume during grocery shopping.",
    "Buy products in bulk. Packaging increases product cost and adds more to our landfills.",
    "Non-toxic cleaners can work effectively. Consider purchasing these in the future.",
    "Keep a food discard collection container (for composting) handy at the sink.",
    "Use cloth napkins instead of disposable napkins.",
    "Organically grown foods reduce the amount of pesticides and herbicides used on crops. Buy local foods.",
    "Linoleum floor covering is nontoxic as compared to vinyl floor coverings.",
    "Bring your lunch in reusable containers rather than disposable packaging.",
    "Indoor drains discharge to waste water treatment plant. When cleaning up painting equipment & tools, wash them in an interior drain. Water based paints are less toxic and easiest to cleanup after.",
    "Disposable batteries = more landfill waste & pollution. Use rechargeable batteries. Regular alkaline batteries are not recycled.",
    "Buy products containing recycled content material (jackets made from recycled plastic, paper, glass).",
    "Take used oil to recycling station-do not pour on ground or into storm drain!",
    "Choose electric power equipment instead of gas-powered.",
    "Regularly replace or clean furnace filters.",
    "Leave the car home once a week or more. Carpool, ride the bus, walk or ride your bike.",
    "Keep gas-powered vehicles tuned up for fuel efficiency.",
    "Keep tires inflated correctly to reduce wear on tires & maximize mileage. Avoid air pollution by minimizing idling time.",
    "Hike or bike instead of using off-road vehicles for recreation. Swim, raft or canoe instead of using motorized choices on the water.",
    //Recycle
    "If it's not broken, don't replace it. Try and get as much use out of your products as possible.",
    "Add more recycle bins around the house so you're more likely to use them.",
    "Shop at second hand clothing stores.",
    "If possible, return the item back to the producer so it can be disposed of properly. This is especially important with electronics.",
    "Shop for better made, higher quality items so they last longer.",
    "Before throwing things out, see if you can find another use for it around the house.",
    "Avoid packaged goods whenever possible.",
    "Research companies that claim to be green. Some companies use clever marketing to make their products appear eco-friendly when they really aren't.",
    "Know the difference between recyclable products and recycled products. Do your best to purchase recycled products!",
    "Get creative and see how you can re-purpose materials you have lying around.",
    "Make an arts and crafts project with things you have around the house.",
    "Recycle your water. If you're a homeowner, consider rearranging your plumbing so that rainwater or wastewater from your shower and tub is used to flush your toilet. If you have a garden, water it with leftover bathwater or dishwashing water.",
    "When shopping, give preference to the model that can be easily upgraded or cannibalized for parts so that you don't have to throw away the whole thing if one part breaks.",
    "Make a real for your household that nothing usable should be thrown in the trash. Give away things you don't use anymore to charity or sell it online.",
    "Give away clothes that no longer fit you. This will make someones day and it reduces the amount of new clothes that are made.",
    //Deforestation
    "Recycle and buy recycled items to reduce the need to cut down trees.",
    "Make the transition and go paperless. Encourage your employer to do the same if possible!",
    "Go out and plant a tree. 1 well placed tree can also reduce your cooling costs by 25 percent. For maximum benefit, place leafy shade trees to the south and west and evergreens to the north.",
    "Go outside and appreciate nature. The more respect for nature you have the more likely you are to take steps to protect it.",
    "Try and cut down on meat intake. Look up a vegetarian recipe and give it a try!",
    "Do some research to avoid buying meat products from land where forests have been cleared.",
    "When shopping, buy organic products. Organic products are grown naturally as opposed to conventionally grown produce that uses chemicals.",
    "Do not purchase palm oil. According to the World Wildlife Fund, an area the equivalent size of 300 football fields of rainforest is cleared each hour to make way for palm oil production.",
    "Do not use firewood to heat up your fireplace. It takes a few hours to burn, but years to grow a single tree.",
    "Encourage those around you to live in a way that doesn't hurt the environment. There truly is power in numbers with issues like these. Spend time educating yourself and others about these topics.",
    "Do not buy anything from large, multinationals that are actively or indirectly involved or responsible for the clearing of forest land.",
    "Support companies that produce products by causing minimal harm to the environment.",
    "Get involved in one of the many organizations that combats deforestation.",
    "When purchasing wood, make sure you buy a product that is certified as sustainable by the Forest Stewardship Council.",
    "Help restore degraded forests. Non-profit organisations such as The Sierra Club are working throughout the world to restore degraded forests and return them to their former glory.",
    //Energy
    "A well insulated house & energy efficient windows conserve energy and saves money.",
    "Keep hot water heater set at 120 degrees to conserve energy.",
    "Hang clothing up to dry so you don't have to use the drier. This also prevents clothes from shrinking.",
    "During the day, you can maximize natural daylight by using natural light instead of overhead or fluorescent lights. Switching off one fluorescent light for one hour a day can save 30 kilogram of carbon dioxide emissions a year.",
    "Look for areas that have excessive lighting. Consider removing any of the unnecessary lights to save money and conserve energy.",
    "Switch lighting in your house to more energy efficient models. This will save you money in the long run on your energy bill. Talk to your employer about doing the same.",
    "Conduct a home energy audit. There are many companies out there who will give you a detailed, specific report on how to save energy throughout your home.",
    "Have your heating system inspected regularly, especially if it's natural gas. A $50 to $100 annual tune up can reduce heating costs by up to 5 percent annually.",
    "Install a programmable thermostat. If you set the temperature back 10 degrees for 8 hours every night, you'll lower your heating bills by 10 percent annually.",
    "Don't set your thermostat higher than you actually want it. It won't heat your home any faster and it keeps your furnace running longer than necessary.",
    "Ensure that your furniture and draperies are not blocking air flow from vents.",
    "Maintain your central air conditioner by cleaning the outside compressor with a garden hose. Be sure to shut off power at the fuse or breaker first. Also, keep plantings at least 1 foot away for adequate airflow.",
    "It's a good idea to shade south and west facing windows during the hottest part of the day.",
    "Plant a tree. 1 well placed tree can reduce your cooling costs by 25 percent. For maximum benefit, place leafy shade trees to the south and west and evergreens to the north.",
    "Use ceiling fans to help circulate air throughout the house. Ceiling fans should run clockwise during the summer and counter clockwise during the winter.",
    "Check the exterior of your home for air leaks, especially around openings for water spigots, air conditioner hoses, dryer vents and gas pipes. Use caulk or expanding foam to seal spaces.",
    "A reflective window film can help reduce heat gain during the summer. It will also keep furniture and carpets from fading!",
    "If drafts sneak in under exterior doors, replace the threshold. If that's not practical, block the drafts with a rolled-up towel or blanket.",
    "Use smaller  kitchen appliances whenever possible. Microwaves, toaster ovens and slow-cookers can use 75 percent less energy than a large electric oven.",
    "Vacuum the refrigerator coils about twice a year to keep the compressor running efficiently.",
    "Check the seal on your refrigerator door by closing it on a dollar bill. If you can pull the bill out easily, it's time to replace the gaskets. You can purchase a replacement kit from an appliance dealer or a home center.",
    "Make sure that you wash only full loads of clothes. The same rule applies with the dishwasher!",
    "Clean the lint screen on the dryer every time you use the machine. A clogged lint screen can make your dryer use up to 30 percent more energy.",
    "Switch to compact fluorescent light bulbs. These bulbs use 75 percent less energy than typical incandescents, and they last 10 times longer.",
    "Use lighting control devices like dimmers, motion detectors, occupancy sensors, photocells and timers to provide light only when you need it.",
    "Use only a single bulb in a multi-socket fixture. Be sure to check the maximum wattage the fixture allows.",
    "Unplug any electrical device that's not being used. Many appliances, especially computers and televisions, draw power even when turned off.",
    "Place humidifiers and dehumidifiers away from walls and bulky furniture. These appliances work best when air circulates freely around them. Be sure to clean the unit often to prevent unhealthy mold and bacteria from developing.",
    "Use a power strip to plug in all of your devices. Flipping the switch on your power strip has the same effect as unplugging each socket from the wall, preventing energy loss."
];

var waterTIPS = [
	"Put a bucket in the shower while you're waiting for the water to warm up, and use the water you catch for watering plants, flushing the toilet or cleaning.",
    "Install a low-flow showerhead. It may cost you some money up front, but your water conservation efforts will save you money down the road. Conventional showerheads flow at 5 gallons per minute or more, whereas low-flow showerheads typically flow at 2.5 gallons per minute.",
    "Turn off the water if you shave or brush your teeth in the shower",
    "Think of baths as an occasional treat and stick to showers. The average bath uses 35 to 50 gallons of water, whereas a 10-minute shower with a low-flow showerhead only uses 25 gallons.",
    "Fix those leaky faucets. That constant drip is more than just annoying; it’s also a huge waste of water. You can lose more than 20 gallons of water a day from a single drippy faucet!",
    "If you can’t replace your higher volume toilet, put a plastic bottle filled with water in your toilet tank to reduce the amount of water used per flush.",
    "To check for a toilet leak, put dye or food coloring into the tank. If color appears in the bowl without flushing, there’s a leak that should be repaired.",
    "Don’t flush things down the toilet to dispose of them. Throw tissues and other bathroom waste in the garbage can, which doesn’t require gallons of water.",
    "Read the house water meter before and after a two-hour period when no water is being used. If the meter does not read exactly the same, there is a leak.",
    "You should try to keep showers under 5 minutes.",
    "If it’s yellow, let it mellow. This tip might not be for everyone, but the toilet is one of the most water-intensive fixtures in the house. Do you need to flush every time?",
    "If you feel compelled to wash your car, take it to a car wash that recycles the water, rather than washing at home with the hose.",
    "Install a rain barrel. Rainwater harvesting is a great way to keep your plants hydrated without turning on the hose or sprinkler.",
    "Older toilets use a lot of water. You can reduce your water usage by sinking a half gallon jug of water in the toilet tank.",
    "When hand washing dishes, fill up your sink with water, instead of letting it run the whole time that you’re scrubbing.",
    "Whether you're at home or at a hotel, reuse your towels to cut back on washer and drier use."

];

var pollutionTIPS = [
    "Bike or walk instead of driving. Every 25 miles you don't drive prevents a pound of pollution.",
    "Consider using solar energy in your house. Solar energy prevents water and air pollution associated with burning fossil fuels for energy.",
    "Recycle burned out fluorescent lamps at a Hazardous Waste Collection Center. Fluorescent lamps may contain mercury.",
    "Choose earth friendly lawn care methods & products. When using chemicals, follow package instructions for use and disposal. Excess chemicals can destroy beneficial insects. If in doubt, ask an expert.",
    "Consider using a push mower for your lawn. No air pollution, minimal maintenance & good exercise.",
    "Leaving small grass clippings on the lawn, a.k.a. grasscycling, provides nutrients to the soil, creates healthy lawns and diverts yard debris from the landfill.",
    "Commercially available eco-lawn mixes can reduce watering and yard maintenance.",
    "Plant trees! They provide shade, clean air, mask noise and need much less water than lawns.",
    "Consider plastic lumber for a deck or bench. Recycled content plastic lumber is durable and requires no painting.",
    "Create a backyard compost pile, or invest in a composter. Composting is nature's way of recycling. It converts plant waste into a rich soil additive.",
    "Avoid aerosol products. They can pose safety hazards and require special processing at the Household Hazardous Waste Collection Center.",
    "Use a durable canvas grocery bag. REUSE IS BETTER THAN RECYCLING. Canvas bags reduce the amount of disposable or recyclable bags we consume during grocery shopping.",
    "Buy products in bulk. Packaging increases product cost and adds more to our landfills.",
    "Non-toxic cleaners can work effectively. Consider purchasing these in the future.",
    "Keep a food discard collection container (for composting) handy at the sink.",
    "Use cloth napkins instead of disposable napkins.",
    "Organically grown foods reduce the amount of pesticides and herbicides used on crops. Buy local foods.",
    "Linoleum floor covering is nontoxic as compared to vinyl floor coverings.",
    "Bring your lunch in reusable containers rather than disposable packaging.",
    "Indoor drains discharge to waste water treatment plant. When cleaning up painting equipment & tools, wash them in an interior drain. Water based paints are less toxic and easiest to cleanup after.",
    "Disposable batteries = more landfill waste & pollution. Use rechargeable batteries. Regular alkaline batteries are not recycled.",
    "Buy products containing recycled content material (jackets made from recycled plastic, paper, glass).",
    "Take used oil to recycling station-do not pour on ground or into storm drain!",
    "Choose electric power equipment instead of gas-powered.",
    "Regularly replace or clean furnace filters.",
    "Leave the car home once a week or more. Carpool, ride the bus, walk or ride your bike.",
    "Keep gas-powered vehicles tuned up for fuel efficiency.",
    "Keep tires inflated correctly to reduce wear on tires & maximize mileage. Avoid air pollution by minimizing idling time.",
    "Hike or bike instead of using off-road vehicles for recreation. Swim, raft or canoe instead of using motorized choices on the water."
];

var recycleTIPS = [
    "If it's not broken, don't replace it. Try and get as much use out of your products as possible.",
    "Add more recycle bins around the house so you're more likely to use them.",
    "Shop at second hand clothing stores.",
    "If possible, return the item back to the producer so it can be disposed of properly. This is especially important with electronics.",
    "Shop for better made, higher quality items so they last longer.",
    "Before throwing things out, see if you can find another use for it around the house.",
    "Avoid packaged goods whenever possible.",
    "Research companies that claim to be green. Some companies use clever marketing to make their products appear eco-friendly when they really aren't.",
    "Know the difference between recyclable products and recycled products. Do your best to purchase recycled products!",
    "Get creative and see how you can re-purpose materials you have lying around.",
    "Make an arts and crafts project with things you have around the house.",
    "Recycle your water. If you're a homeowner, consider rearranging your plumbing so that rainwater or wastewater from your shower and tub is used to flush your toilet. If you have a garden, water it with leftover bathwater or dishwashing water.",
    "When shopping, give preference to the model that can be easily upgraded or cannibalized for parts so that you don't have to throw away the whole thing if one part breaks.",
    "Make a real for your household that nothing usable should be thrown in the trash. Give away things you don't use anymore to charity or sell it online.",
    "Give away clothes that no longer fit you. This will make someones day and it reduces the amount of new clothes that are made."
];

var deforestationTIPS = [
    "Recycle and buy recycled items to reduce the need to cut down trees.",
    "Make the transition and go paperless. Encourage your employer to do the same if possible!",
    "Go out and plant a tree. 1 well placed tree can also reduce your cooling costs by 25 percent. For maximum benefit, place leafy shade trees to the south and west and evergreens to the north.",
    "Go outside and appreciate nature. The more respect for nature you have the more likely you are to take steps to protect it.",
    "Try and cut down on meat intake. Look up a vegetarian recipe and give it a try!",
    "Do some research to avoid buying meat products from land where forests have been cleared.",
    "When shopping, buy organic products. Organic products are grown naturally as opposed to conventionally grown produce that uses chemicals.",
    "Do not purchase palm oil. According to the World Wildlife Fund, an area the equivalent size of 300 football fields of rainforest is cleared each hour to make way for palm oil production.",
    "Do not use firewood to heat up your fireplace. It takes a few hours to burn, but years to grow a single tree.",
    "Encourage those around you to live in a way that doesn't hurt the environment. There truly is power in numbers with issues like these. Spend time educating yourself and others about these topics.",
    "Do not buy anything from large, multinationals that are actively or indirectly involved or responsible for the clearing of forest land.",
    "Support companies that produce products by causing minimal harm to the environment.",
    "Get involved in one of the many organizations that combats deforestation.",
    "When purchasing wood, make sure you buy a product that is certified as sustainable by the Forest Stewardship Council.",
    "Help restore degraded forests. Non-profit organisations such as The Sierra Club are working throughout the world to restore degraded forests and return them to their former glory."
];

var energyTIPS = [
    "A well insulated house & energy efficient windows conserve energy and saves money.",
    "Keep hot water heater set at 120 degrees to conserve energy.",
    "Hang clothing up to dry so you don't have to use the drier. This also prevents clothes from shrinking.",
    "During the day, you can maximize natural daylight by using natural light instead of overhead or fluorescent lights. Switching off one fluorescent light for one hour a day can save 30 kilogram of carbon dioxide emissions a year.",
    "Look for areas that have excessive lighting. Consider removing any of the unnecessary lights to save money and conserve energy.",
    "Switch lighting in your house to more energy efficient models. This will save you money in the long run on your energy bill. Talk to your employer about doing the same.",
    "Conduct a home energy audit. There are many companies out there who will give you a detailed, specific report on how to save energy throughout your home.",
    "Have your heating system inspected regularly, especially if it's natural gas. A $50 to $100 annual tune up can reduce heating costs by up to 5 percent annually.",
    "Install a programmable thermostat. If you set the temperature back 10 degrees for 8 hours every night, you'll lower your heating bills by 10 percent annually.",
    "Don't set your thermostat higher than you actually want it. It won't heat your home any faster and it keeps your furnace running longer than necessary.",
    "Ensure that your furniture and draperies are not blocking air flow from vents.",
    "Maintain your central air conditioner by cleaning the outside compressor with a garden hose. Be sure to shut off power at the fuse or breaker first. Also, keep plantings at least 1 foot away for adequate airflow.",
    "It's a good idea to shade south and west facing windows during the hottest part of the day.",
    "Plant a tree. 1 well placed tree can reduce your cooling costs by 25 percent. For maximum benefit, place leafy shade trees to the south and west and evergreens to the north.",
    "Use ceiling fans to help circulate air throughout the house. Ceiling fans should run clockwise during the summer and counter clockwise during the winter.",
    "Check the exterior of your home for air leaks, especially around openings for water spigots, air conditioner hoses, dryer vents and gas pipes. Use caulk or expanding foam to seal spaces.",
    "A reflective window film can help reduce heat gain during the summer. It will also keep furniture and carpets from fading!",
    "If drafts sneak in under exterior doors, replace the threshold. If that's not practical, block the drafts with a rolled-up towel or blanket.",
    "Use smaller  kitchen appliances whenever possible. Microwaves, toaster ovens and slow-cookers can use 75 percent less energy than a large electric oven.",
    "Vacuum the refrigerator coils about twice a year to keep the compressor running efficiently.",
    "Check the seal on your refrigerator door by closing it on a dollar bill. If you can pull the bill out easily, it's time to replace the gaskets. You can purchase a replacement kit from an appliance dealer or a home center.",
    "Make sure that you wash only full loads of clothes. The same rule applies with the dishwasher!",
    "Clean the lint screen on the dryer every time you use the machine. A clogged lint screen can make your dryer use up to 30 percent more energy.",
    "Switch to compact fluorescent light bulbs. These bulbs use 75 percent less energy than typical incandescents, and they last 10 times longer.",
    "Use lighting control devices like dimmers, motion detectors, occupancy sensors, photocells and timers to provide light only when you need it.",
    "Use only a single bulb in a multi-socket fixture. Be sure to check the maximum wattage the fixture allows.",
    "Unplug any electrical device that's not being used. Many appliances, especially computers and televisions, draw power even when turned off.",
    "Place humidifiers and dehumidifiers away from walls and bulky furniture. These appliances work best when air circulates freely around them. Be sure to clean the unit often to prevent unhealthy mold and bacteria from developing.",
    "Use a power strip to plug in all of your devices. Flipping the switch on your power strip has the same effect as unplugging each socket from the wall, preventing energy loss."
];

var lastTip = "You haven't asked for a tip yet.";

var handlers = {
	
    'LaunchRequest': function () {
    	this.emit('sayHello');
    },
    'sayHello': function () {
    	var hello = "Challenge yourself to put as many of these tips into practice as you can!. Ask me for a random tip or ask me for the categories I know!";
        this.emit(':ask', hello);
    },
    'getPollutionTip': function () {
        this.emit('pollutionTip');
    },
    'pollutionTip': function () {

        var tipIndex = Math.floor(Math.random() * pollutionTIPS.length);
        var randomTip = pollutionTIPS[tipIndex];

        // Create speech output
        var speechOutput = "Here's a tip to reduce pollution and climate change: " + randomTip + " Would you like another?";
        lastTip = randomTip;

        this.emit(':askWithCard', speechOutput, SKILL_NAME, randomTip);
    },
    'getEnergyTip': function () {
        this.emit('energyTip');
    },
    'energyTip': function () {

        var tipIndex = Math.floor(Math.random() * energyTIPS.length);
        var randomTip = energyTIPS[tipIndex];

        // Create speech output
        var speechOutput = "Here's a tip to save energy: " + randomTip + " Would you like another?";
        lastTip = randomTip;

        this.emit(':askWithCard', speechOutput, SKILL_NAME, randomTip);
    },
    'getDeforestationTip': function () {
        this.emit('deforestationTip');
    },
    'deforestationTip': function () {

        var tipIndex = Math.floor(Math.random() * deforestationTIPS.length);
        var randomTip = deforestationTIPS[tipIndex];

        // Create speech output
        var speechOutput = "Here's a tip to fight deforestation: " + randomTip + " Would you like another?";
        lastTip = randomTip;

        this.emit(':askWithCard', speechOutput, SKILL_NAME, randomTip);
    },
    'listTipCategories': function () {
        this.emit('categories');
    },
    'categories': function () {
        var cat = "I can give you useful tips on conserving water, pullution, recycling, deforestation or saving energy. You can also ask me for a random tip!";
        this.emit(':ask', cat);
    },

    'getRecycleTip': function () {
        this.emit('recycleTip');
    },
    'recycleTip': function () {

        var tipIndex = Math.floor(Math.random() * recycleTIPS.length);
        var randomTip = recycleTIPS[tipIndex];

        // Create speech output
        var speechOutput = "Here's a recycling tip: " + randomTip + " Would you like another?";
        lastTip = randomTip;

        this.emit(':askWithCard', speechOutput, SKILL_NAME, randomTip);
    },
    'getRandomTip': function () {
    	this.emit('randomTip');
    },
    'randomTip': function () {

    	var tipIndex = Math.floor(Math.random() * allTIPS.length);
        var randomTip = allTIPS[tipIndex];

        // Create speech output
        var speechOutput = "Here's a random tip: " + randomTip + " Would you like another?";
        lastTip = randomTip;

        this.emit(':askWithCard', speechOutput, SKILL_NAME, randomTip);
    },
    'getWaterConservationTip': function () {
    	this.emit('waterTip');
    },
    'waterTip': function () {

    	var tipIndex = Math.floor(Math.random() * waterTIPS.length);
        var randomTip = waterTIPS[tipIndex];

        // Create speech output
        var speechOutput = "Here's a water conservation tip: " + randomTip + " Would you like another?";
        lastTip = randomTip;

        this.emit(':askWithCard', speechOutput, SKILL_NAME, randomTip);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can ask me for tips about water conservation, recycling, pollution, deforestation, or saving energy. You can also ask for a random tip!";
        var reprompt = "What kind of tip would you like to hear?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.YesIntent': function () {
        var askQ = "Okay, what category?";
        this.emit(':ask', askQ);
    },
    'AMAZON.NoIntent': function () {
        this.emit(':tell', 'See you later!');
    },
    'AMAZON.RepeatIntent': function () {
        lastTip = lastTip + " Would you like another?";
        this.emit(':ask', lastTip);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'Unhandled': function () {
        var apology = "Sorry, I didn't get that. Ask me for a tip about water conservation, recycling, pollution, deforestation, or saving energy";
        this.emit(':ask', apology);
    }

};