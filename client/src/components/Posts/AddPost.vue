<template>
  <v-container text-xs-center mt-5 pt-5>

  <!-- Signup Title -->
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <h1 class="primary--text">Create New Post</h1>
    </v-flex>
  </v-layout>

  <!-- AddPost Form -->
  <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
    
          <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleAddPost">

            <!-- Title input -->
            <v-layout row>
              <v-flex xs12>
                <v-text-field :rules="titleRules" v-model="title" label="Post Title" type="text" required></v-text-field>
              </v-flex>
            </v-layout>

            <!-- Image url imput -->
            <v-layout row>
              <v-flex xs12>
                <v-text-field :rules="imageRules" v-model="imageUrl" label="Image URL" type="text" required></v-text-field>
              </v-flex>
            </v-layout>

            <!-- Image preview -->
            <v-layout row>
              <v-flex xs12>
                <img :src="imageUrl" height="300px">
              </v-flex>
            </v-layout>

            <!-- Categories select -->
            <v-layout row>
              <v-flex xs12>
                <v-select :rules="categoriesRules" v-model="categories" :items="sortedCategories" multiple label="Categories">
                </v-select>
              </v-flex>
            </v-layout>

            <!-- Description text area -->
            <v-layout row>
              <v-flex xs12>
                <v-textarea :rules="descRules" v-model="description" label="Description" type="text" required></v-textarea>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12>
                <v-btn :loading="loading" :disabled="!isFormValid || loading" color="info" type="submit">
                  <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                  Submit</v-btn>
              </v-flex>
            </v-layout>

          </v-form>

    </v-flex>
  </v-layout>

  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'AddPost',
    data() {
      return {
        isFormValid: true,
        title: '',
        imageUrl: '',
        categories: [],
        description: '',
        pattern: /^((http|https|ftp):\/\/)/,
        titleRules: [
          title => !!title ||"Title is required",
          title => title.length < 20 || "Title must be less than 20 characters"
        ],
        imageRules: [
          image => !!image ||"Image url is required",
          image => !!this.pattern.test(image) || "Please enter valid URL"
        ],
        categoriesRules: [
          categories => categories.length >= 1 ||"One or more categories are required"
        ],
        descRules: [
          desc => !!desc ||"Description is required",
          desc => desc.length < 200 || "Description must be less than 200 characters"
        ]
      }
    },
    computed: {
      ...mapGetters(['loading', 'user'])
      ,
      sortedCategories() {
        const items = ['Art', 'Education', 'Travel', 'Photography', 'Technology', 'Financial', 'Social', 'News', 'Political', 'Gaming', 'Food and Drink', 'Shopping', 'Film and TV', 'Weather', 'Environment', 'Opinion', 'Humour', 'History', 'Future', 'Expert', 'Work'];
        return items.sort();
      }
    },
    methods: {
      handleAddPost() {
        if (this.$refs.form.validate()) {
          // add post action
          this.$store.dispatch('addPost', {
            title: this.title,
            imageUrl: this.imageUrl,
            categories: this.categories,
            description: this.description,
            creatorId: this.user._id
          });
          this.$router.push('/');
        }
      }
    }
  }
</script>