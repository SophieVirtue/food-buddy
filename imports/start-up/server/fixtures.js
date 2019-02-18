import { Meteor } from 'meteor/meteor';
import { Tags } from '../../api/tags';
import { TagCategories } from '../../api/tagCategories';
import { Accounts } from 'meteor/accounts-base';
import { CuisineTags, FoodtypeTags, DietaryPreferenceTags } from './tagsData';

Meteor.startup(() => {
  if (TagCategories.find().count() === 0) {
    TagCategories.insert({ title: 'Cuisine' });
    TagCategories.insert({ title: 'Food Types' });
    TagCategories.insert({ title: 'Dietary Preferences' });
    TagCategories.insert({ title: 'Extra' });

    const errors = TagCategories.simpleSchema()
      .namedContext()
      .validationErrors();
    if (errors && errors.length > 0) {
      console.log(errors);
    }
  }

  if (Tags.find().count() === 0) {
    const tags = [...CuisineTags, ...FoodtypeTags, ...DietaryPreferenceTags];
    tags.forEach(tag => {
      Tags.insert({
        title: tag.title,
        category: TagCategories.findOne({ title: tag.category })
      });
    });
    const errors = Tags.simpleSchema()
      .namedContext()
      .validationErrors();
    if (errors && errors.length > 0) {
      console.log(errors);
    }
  }

  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      email: 'test@test.com',
      password: 'password',
      username: 'BobJr',
      profile: {
        name: 'Bob Jr.',
        tags: Tags.find({
          title: {
            $in: [
              'Asian',
              'Gluten free',
              'Burgers',
              'Kebab',
              'Fries',
              'Chicken Wings'
            ]
          }
        }).map(tag => tag._id)
      }
    });
    Accounts.createUser({
      email: 'hobs@hobs.com',
      password: 'hobs',
      username: 'Hobbs',
      profile: {
        name: 'Hobbs',
        tags: Tags.find({
          title: { $in: ['Vegetarian', 'Burgers', 'Fries', 'Bubble Tea'] }
        }).map(tag => tag._id)
      }
    });
    Accounts.createUser({
      email: 'a@b.c',
      password: 'password',
      username: 'BabyLungs',
      profile: {
        name: 'Baby Lungs',
        tags: Tags.find({
          title: {
            $in: ['Burgers', 'Asian', 'Dumplings', 'Dim Sum', 'Brunch']
          }
        }).map(tag => tag._id)
      }
    });
    Accounts.createUser({
      email: 'buffkorean@ktv.com',
      password: 'password',
      username: 'BuffKorean',
      profile: {
        name: 'Buff Korean',
        tags: Tags.find({
          title: {
            $in: [
              'Burgers',
              'Burritos',
              'Rice',
              'Korean',
              'Chicken Wings',
              'BBQ'
            ]
          }
        }).map(tag => tag._id)
      }
    });
    Accounts.createUser({
      email: 'ryanreynolds.yvr@gmail.com',
      password: 'password',
      username: 'ryanreynolds',
      profile: {
        name: 'Ryan Reynolds',
        tags: Tags.find({
          title: {
            $in: [
              'Burgers',
              'Thai',
              'Kebab',
              'Canadian',
              'Chicken Wings',
              'Dim Sum',
              'Taco'
            ]
          }
        }).map(tag => tag._id)
      }
    });
    Accounts.createUser({
      email: 'hiltonparis728@gmail.com',
      password: 'password',
      username: 'ParisHilton',
      profile: {
        name: 'Paris Hilton',
        tags: Tags.find({
          title: {
            $in: [
              'Burgers',
              'French',
              'Kebab',
              'American',
              'Fries',
              'Brunch',
              'Low-Carb'
            ]
          }
        }).map(tag => tag._id)
      }
    });
    Accounts.createUser({
      email: 'not@onboarded.com',
      password: 'password',
      username: 'HumanBeing'
    });

    const errors = Meteor.users
      .simpleSchema()
      .namedContext()
      .validationErrors();
    if (errors && errors.length > 0) {
      console.log(errors);
    }
  }
});
