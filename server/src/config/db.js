const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await findOneListingByName(client, "https://www.google.es/search?q=midudev&sca_esv=600274493&sxsrf=ACQVn09Qb36ag_HLR5Xuo7mouAEyNzhXIw%3A1705870027710&source=hp&ei=y4KtZfKhKYWjkdUP-_uCoAY&iflsig=ANes7DEAAAAAZa2Q2zG_3kJ1c5a-tctQApoMfWNxadDv&ved=0ahUKEwiys6GIre-DAxWFUaQEHfu9AGQQ4dUDCA8&uact=5&oq=midudev&gs_lp=Egdnd3Mtd2l6IgdtaWR1ZGV2MggQABiABBixAzIKEAAYgAQYFBiHAjIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAESP8TUKgNWLcTcAF4AJABAJgBWKAB6wOqAQE2uAEDyAEA-AEBqAIKwgIHECMY6gIYJ8ICChAjGIAEGIoFGCfCAgQQIxgnwgILEAAYgAQYsQMYgwHCAg4QABiABBiKBRixAxiDAcICERAuGIAEGLEDGIMBGMcBGNEDwgIOEC4YgAQYsQMYxwEY0QPCAgwQIxiABBiKBRgTGCfCAg4QLhiABBiKBRixAxiDAcICCxAuGIAEGLEDGIMB&sclient=gws-wiz")
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
async function findOneListingByName(client, longUrl) {
    const result = await client.db("url-shortener").collection("url").findOne({ long_url: longUrl });

    if (result) {
        console.log(`Found a url in the collection: '${longUrl}':`);
        console.log(result);
    } else {
        console.log(`No urls found '${longUrl}'`);
    }
}
run().catch(console.dir);