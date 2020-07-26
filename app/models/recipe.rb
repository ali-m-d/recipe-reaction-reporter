class Recipe < ApplicationRecord
    validates :name, presence: true
    
    validates :instruction, presence: true
end
