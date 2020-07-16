## JAMstack ECommerce With Firebase Auth

JAMstack ECommerce provides a way to quickly get up and running with a fully configurable JAMstack E Commerce site.

Out of the box, the site uses completely static data coming from a provider at `providers/inventoryProvider.js`. You can update this provider to fetch data from any real API by changing the call in the `getInventory` function.
Also Firebase Auth is working well at `src/firebase`.

![](design.jpg)

> This project is still in Beta.

### Getting started

1. Clone the project

```sh
$ https://github.com/FullStackTiger/jamstack-ecommerce.git
```

2. Install the dependencies:

```sh
$ yarn

# or

$ npm install
```

3. Set the env files

The .env or .env.development and .env.production files could look like the following then:

example:

```sh
GATSBY_API_KEY=AIzaSyBtxZ3phPeXcsZsRTyyIXa7n33NtQ
GATSBY_AUTH_DOMAIN=react-firebase-s2233d64f8.firebaseapp.com
GATSBY_DATABASE_URL=https://react-firebase-s2233d64f8.firebaseio.com
GATSBY_PROJECT_ID=react-firebase-s2233d64f8
GATSBY_STORAGE_BUCKET=react-firebase-s2233d64f8.appspot.com
GATSBY_MESSAGING_SENDER_ID=701928454501
```

Get an overview of Firebase, how to create a project, what kind of features Firebase offers, and how to navigate through the Firebase project dashboard in this visual tutorial for Firebase.

4. Run the project

```sh
$ gatsby develop

# or to build

$ gatsby build
```

## About the project

### Tailwind

This project is styled using Tailwind. To learn more how this works, check out the Tailwind documentation [here](https://tailwindcss.com/docs).

### Components

The main files, components, and images you may want to change / modify are:

### Firebase Auth in the Admin panel

1. Now it is implemented sign up, sign, in, sign out functions using Firebase Auth.


### How it works

As it is set up, inventory is fetched from a local hard coded array of inventory items. This can easily be configured to instead be fetched from a remote source like Shopify or another CMS or data source by changing the inventory provider.

#### Configuring inventory provider

Update __providers/inventoryProvider.js__ with your own inventory provider.

#### Download images at build time

If you change the provider to fetch images from a remote source, you may choose to also download the images locally at build time to improve performance. Here is an example of some code that should work for this use case:

```javascript
import fs from 'fs'
import axios from 'axios'
import path from 'path'

function getImageKey(url) {
  const split = url.split('/')
  const key = split[split.length - 1]
  const keyItems = key.split('?')
  const imageKey = keyItems[0]
  return imageKey
}

function getPathName(url, pathName = 'downloads') {
  let reqPath = path.join(__dirname, '..')
  let key = getImageKey(url)
  key = key.replace(/%/g, "")
  const rawPath = `${reqPath}/public/${pathName}/${key}`
  return rawPath
}

async function downloadImage (url) {
  return new Promise(async (resolve, reject) => {
    const path = getPathName(url)
    const writer = fs.createWriteStream(path)
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
    response.data.pipe(writer)
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

export default downloadImage
```

You can use this function in __gatsby-node.esm.js__, map over the inventory data after fetching and replace the image paths with a reference to the location of the downloaded images, probably would look something like this:

```javascript
await Promise.all(
  inventory.map(async (item, index) => {
    try {
      const relativeUrl = `../downloads/${item.image}`
      if (!fs.existsSync(`${__dirname}/public/downloads/${item.image}`)) {
        await downloadImage(image)
      }
      inventory[index].image = relativeUrl
    } catch (err) {
      console.log('error downloading image: ', err)
    }
  })
)
```


### Roadmap for V1

- Add ability to specify quantities in cart
- Auto dropdown navigation for large number of categories
- Ability to add more / more configurable metadata to item details
- Themeing + dark mode
- Better image support out of the box
- Optional user account / profiles out of the box

