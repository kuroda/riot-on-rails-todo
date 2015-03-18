class Api::ItemsController < ApplicationController
  def index
    @items = Item.order(id: :desc)
  end

  def create
    if Item.create(item_params)
      render text: 'OK'
    else
      render text: 'NG'
    end
  end

  private
  def item_params
    params.require(:item).permit(:name, :done)
  end
end
