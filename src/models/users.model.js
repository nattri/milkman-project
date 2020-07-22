function Users(mongoose) {
  var schema = mongoose.Schema(
    {
      name: String,
      location: String,
      primaryPhone: String,
      secondaryPhone: String,
      email: String,
      type: String,
      products: [
        {
          name: String,
          quantity: Number
        }
      ],
      additionalInfo: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("users", schema);
}

module.exports = Users;
