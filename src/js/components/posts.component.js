const postsComponent =
  ("postsComponent",
  {
    template:
      "<div ng-repeat='post in $ctrl.posts'>" +
      "<h2>{{post.userName}}</h2>" +
      "<h3>{{post.title}}</h3>" +
      "<p>{{post.content}}</p>" +
      "</div>",

    controller: function postCtrl() {
      this.posts = [
        // {
        //   userName: "Ffkfjgdsf Ydckhds",
        //   title: "Ghjsdfhsdhfks'fksdfjsdfjsdlkfjsd",
        //   content:
        //     "Lorem sdfkjsdlfjsdlkfsdlkfjsdklfjsdklfjsdlkfjsdlkfjsdlkfjsldkfjcouhkavnbodipotk zmndvskf,mfdnjvwk;calzkxlfdgvjlfklcc,mf "
        // },
        // {
        //   userName: "Ydskjfskd Lfdsjhds",
        //   title: "Helloooooooo ",
        //   content:
        //     "Lorem sdfkjsdlfjsdlkfsdlkfjsdklfjsdklfjsdlkfjsdlkfjsdlkfjsldkfjcouhkavnbodipotk zmndvskf,mfdnjvwk;calzkxlfdgvjlfklcc,mf "
        // },
        // {
        //   userName: "Kalhin Roman",
        //   title: "Hello Component",
        //   content:
        //     "Lorem sdfkjsdlfjsdlkfsdlkfjsdklfjsdklfjsdlkfjsdlkfjsdlkfjsldkfjcouhkavnbodipotk zmndvskf,mfdnjvwk;calzkxlfdgvjlfklcc,mf "
        // }
      ];
    }
  });

export default postsComponent;
