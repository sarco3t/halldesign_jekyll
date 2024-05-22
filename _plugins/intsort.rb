module Jekyll
    module IntSort

      def intfilter(input, field)
        (input || []).select { |x| x.public_send(field).to_i > 0 }
      end
      def intsort(input, field)
        (input || []).sort { |a,b | a.public_send(field).to_i <=> b.public_send(field).to_i }
      end
    end
end

Liquid::Template.register_filter(Jekyll::IntSort)