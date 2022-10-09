const { model } = require('mongoose')
const CountryDataSchema = require('./model/country')
const Country = model('Country')

module.exports = {
  Query : {
    async countries() {
      return await Country.find({})
    },
    async country(_, {id}) {
      return await Country.findById(id)
    },
    async filterCountries(_, {country}) {
      if(country === 'All') return await Country.find({})
      return await Country.find({Country: country})
    }
  },

  Mutation: {
    async addNewData(_, {input} ) {
      const newData = new Country({...input})
      try {
        const res = await newData.save()
        return {
          id: res.id,
          ...res._doc
        }
      } catch(err) {
        return {
          data: null
        }
      }
    },

    async updateEntry(_, args) {
      const {id, input} = args
      try {
        const data = await Country.findById(id)
        Object.keys(input).forEach(element => {
          data[element] = input[element]
        })
        const res = await data.save()
        return {
          id: res.id,
          ...res._doc
        }
      } catch (err) {
        return {
          data: null
        }
      }
    },

    async deleteEntry(_, {id}) {
      try {
        const res = await Country.findByIdAndDelete(id)
        return {
          id: res.id,
          ...res._doc
        }
      } catch (err) {
        return {
          data: null
        }
      }
    }
  }
}
