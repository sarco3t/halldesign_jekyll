module Jekyll
  module TranslateFilter

    def translate(input)
      input
    end
  end
end
module Jekyll
  class SeoTag
    class Drop
      def format_string(string)
        string = Liquid::Template.parse("{% t #{string} %}").render(@context) rescue string
        string = FORMAT_STRING_METHODS.reduce(string) do |memo, method|
          filters.public_send(method, memo)
        end

        string unless string.empty?
      end
    end
  end
end
Liquid::Template.register_filter(Jekyll::TranslateFilter)
