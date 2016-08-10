== README

Source code for https://reactive-coffee.herokuapp.com

=== Deployment 

When deploying to Heroku, you can get RethinkDB via Dockhero addon:

1. Sign up for early access at http://dockhero.io/
2. Create a new Heroku app: `heroku create my-coffee` and push the code with `git push heroku master`.
3. While the app is being deployed, in a separate console install Dockhero addon: `heroku addons:create dockhero`.
4. Login into the addon dashboard with `heroku addons:open dockhero` to track provisioning progress. Provisioning will take about 5 minutes.
5. When the provisioning is done, spin up RethinkDB with `heroku dh:compose scale rethinkdb=1`

After that, your app should be up and running on Heroku.
If something goes wrong, check the logs with  `heroku logs --tail` or `heroku dh:compose logs -f`
