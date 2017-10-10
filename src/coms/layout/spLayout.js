export default {
  install: function (Vue) {
    Vue.component("sp-layout", {
      props: ['item'],
      template: '<div>\
                    <template v-if="item.type == \'sp_layout\'">\
                      <template v-for="attr in item.attributes">\
                        <Row>\
                          <template v-for="spanValue in attr.col">\
                            <Col :span="spanValue">col-{{spanValue}}</Col>\
                          </template>\
                        </Row>\
                      </template>\
                    </template>\
                </div>'
    })
  }
}