module Jekyll
    module ChunkFilter
      def chunk(input, per = 2)
        (input || []).each_slice(per).to_a
      end
    end
end

Liquid::Template.register_filter(Jekyll::ChunkFilter)