# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

9.times do |i|
   Recipe.create(
        name: "Spicy pies with sweet potato mash",
        ingredients: [
            "1kg sweet potatoes, peeled and cut into large chunks",
            "2 tbsp milk",
            "50g mature cheddar, finely grated",
            "1 tbsp rapeseed oil",
            "2 onions, halved and sliced",
            "500g lean beef mince (5% fat)",
            "1 tbsp smoked paprika, plus extra for sprinkling",
            "1 tbsp ground cumin",
            "1 tbsp ground coriander",
            "1 tbsp mild chilli powder",
            "1 tbsp vegetable bouillon powder",
            "400g can black-eyed beans",
            "400g can chopped tomatoes",
            "1 large green pepper, diced"
        ],
        instruction:
            "Boil the sweet potato for 15 mins or until tender, taking care not to overcook.
            Meanwhile, heat the oil in a large, deep, non-stick frying pan. Add the onions, cover and cook for 8 mins or until softened and starting to colour. Stir in the mince, breaking it up with a wooden spoon until browned. Stir in all the spices and bouillon, then add the beans with their liquid, the tomatoes and pepper. Cover and simmer for 20 mins. Stir in the corn with its liquid, season and take off the heat.
            While the mince cooks, mash the potatoes with the milk to make a stiff mash. Spoon the mince into six individual pie dishes, top each with some mash, then sprinkle over the cheese and a little paprika.
            The pies can now be frozen. If eating straight away, put under a hot grill until piping hot and the cheese is melted. To cook from frozen, thaw completely, then reheat in the oven on a baking tray at 180C/160C fan/ gas 4 for 30-40 mins or until piping hot throughout. Serve with broccoli or a salad, if you like, which will take you to all 5 of your 5-a-day.",
        image: "http://res.cloudinary.com/dbhgzt56w/image/upload/v1595767430/bv1zai4z9bq9xekcsxyo.jpg"
    ) 
end
